import type { WorkingSnippet } from "./snippets";

export const PAGE_SNIPPETS: WorkingSnippet[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    blocks: [
      {
        id: "dashboard-page",
        code: `import { useState } from "react";

import AppTable from "@/components/common/AppTable";
import AppInput from "@/components/common/AppInput";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchPosts,
  updatePost,
  deletePost,
} from "@/services/posts.api";

import { toast } from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const queryClient = useQueryClient();

  // Dialog states
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "",
    body: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
  });

  // Pagination calculations
  const posts = data ?? [];
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safePage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedPosts = posts.slice(startIndex, endIndex);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Post updated successfully");

      setSelectedPost(null);
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to update post");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Post deleted successfully");

      setPostToDelete(null);
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to delete post");
    },
  });

  // Open edit dialog
  const handleEdit = (post) => {
    setSelectedPost(post);

    setEditForm({
      title: post.title,
      body: post.body,
    });
  };

  // Update post
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedPost) return;

    updateMutation.mutate({
      id: selectedPost.id,
      ...editForm,
    });
  };

  // Delete post
  const handleDelete = () => {
    if (!postToDelete) return;

    deleteMutation.mutate(postToDelete.id);
  };

  // Table columns
  const columns = [
    {
      key: "userId",
      label: "User",
      width: "80px",
    },
    {
      key: "id",
      label: "Post Id",
      width: "80px",
    },
    {
      key: "title",
      label: "Title",
      maxWidth: "100px",
    },
    {
      key: "body",
      label: "Description",
      maxWidth: "200px",
    },
    {
      key: "actions",
      label: "Actions",
      width: "150px",

      render: (post) => (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleEdit(post)}
          >
            <Pencil className="size-4" />
            Edit
          </Button>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => setPostToDelete(post)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <p>Loading posts...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="py-6">
      {/* Dashboard header */}
      <div className="flex justify-between w-full mb-4 gap-4">
        <AppInput
          className="w-full"
          placeholder="Search for ..."
        />

        <Link to="/new-post">
          <Button>
            <Plus />
            New Article
          </Button>
        </Link>
      </div>

      {/* Posts table */}
      <AppTable
        columns={columns}
        data={paginatedPosts}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {totalPosts === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, totalPosts)} of {totalPosts} posts
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={safePage === 1}
          >
            First
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={safePage === 1}
          >
            Previous
          </Button>

          <span className="text-sm whitespace-nowrap">
            Page {safePage} of {Math.max(totalPages, 1)}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={safePage >= totalPages}
          >
            Next
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={safePage >= totalPages || totalPages === 0}
          >
            Last
          </Button>
        </div>
      </div>

      {/* EDIT POST DIALOG */}
      <Dialog
        open={!!selectedPost}
        onOpenChange={(open) => {
          if (!open && !updateMutation.isPending) {
            setSelectedPost(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>

            <DialogDescription>
              Update your post details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="edit-title"
                className="text-sm font-medium"
              >
                Title
              </label>

              <AppInput
                id="edit-title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="edit-body"
                className="text-sm font-medium"
              >
                Description
              </label>

              <Textarea
                id="edit-body"
                value={editForm.body}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    body: e.target.value,
                  }))
                }
                placeholder="Enter post description"
                required
                className="min-h-32"
              />
            </div>

            <DialogFooter>
              <DialogClose
                render={<Button type="button" variant="outline" />}
              >
                Cancel
              </DialogClose>

              <Button
                type="submit"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending
                  ? "Updating..."
                  : "Update Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!postToDelete}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setPostToDelete(null);
          }
        }}
        title="Delete Post?"
        description="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
        confirmText="Delete"
        pendingText="Deleting..."
      />
    </div>
  );
};

export default Dashboard;`,
      },
    ],
  },
  {
    id: "new-article",
    title: "New article",
    blocks: [
      {
        id: "new-article-page",
        code: `import AppInput from "@/components/common/AppInput";
import AppTextArea from "@/components/common/AppTextArea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/services/posts.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const ArticleSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),

    body: z
        .string()
        .min(10, "Content must be at least 10 characters"),
});

const AddNewArticle = () => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ArticleSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createPost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Post submitted successfully!");
            reset();
        },

        onError: (error) => {
            toast.error(error.message || "Something went wrong!");
        },
    });

    const onSubmit = (formData) => {
        mutate({
            ...formData,
            userId: 1,
        });
    };

    return (
        <div>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <AppInput
                    id="title"
                    label="Article title"
                    required
                    {...register("title")}
                    placeholder="Enter a descriptive article title"
                    error={errors.title?.message}
                    className="py-5"
                />

                <AppTextArea
                    id="body"
                    label="Content"
                    required
                    {...register("body")}
                    placeholder="Enter content"
                    error={errors.body?.message}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loader className="animate-spin" /> : "Save"}
                </Button>
            </form>
        </div>
    );
};

export default AddNewArticle;`,
      },
    ],
  },
  {
    id: "layout",
    title: "Layout",
    description: "The app shell and the sidebar it renders. Copy each file on its own.",
    blocks: [
      {
        id: "main-layout",
        label: "Main layout",
        code: `import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/AppSidebar";

const MainLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarTrigger>

                </SidebarTrigger>
                <main className="flex-1 px-10 py-3">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout;`,
      },
      {
        id: "app-sidebar",
        label: "App sidebar",
        code: `import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Documents", url: "/documents", icon: FileText },
    { title: "Users", url: "/users", icon: Users },
    { title: "Settings", url: "/settings", icon: Settings },
];

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>My Application</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        render={<Link to={item.url} />}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;`,
      },
    ],
  },
];
