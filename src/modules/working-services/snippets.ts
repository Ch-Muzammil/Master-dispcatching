import { PAGE_SNIPPETS } from "./page-snippets";

export type WorkingCodeBlock = {
  id: string;
  /** Shown above the code when a tab has more than one file. */
  label?: string;
  /** Source copied exactly as written. */
  code: string;
};

export type WorkingSnippet = {
  id: string;
  title: string;
  description?: string;
  blocks: WorkingCodeBlock[];
};

/**
 * One entry is one tab on /admin/working-services.
 * Add the next component as another item in this list.
 */
export const WORKING_SNIPPETS: WorkingSnippet[] = [
  {
    id: "alias-setup",
    title: "Alias setup",
    description: "Vite alias and the matching TypeScript path. Copy each file on its own.",
    blocks: [
      {
        id: "alias-vite",
        label: "vite.config",
        code: `import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve:{
    alias:{
      "@" : path.resolve(__dirname, "./src")
    }
  }
})`,
      },
      {
        id: "alias-tsconfig",
        label: "tsconfig paths",
        code: `{"compilerOptions":{
    "baseUrl":".",
    "paths":{
        "@/*" : ["./src/*"]
    }
}}`,
      },
    ],
  },
  {
    id: "table",
    title: "Table",
    blocks: [
      {
        id: "table-component",
        code: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AppTable = ({ columns = [], data = [] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} style={{ width: col.width }}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  style={{ width: col.width, maxWidth: col.maxWidth }}
                  className="overflow-hidden text-ellipsis"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppTable;`,
      },
    ],
  },
  {
    id: "select",
    title: "Select",
    blocks: [
      {
        id: "select-component",
        code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AppSelect = ({
  label,
  value,
  onValueChange,
  placeholder,
  options = [],
}) => {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium mb-1 block">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.label}>
              {option.label} 
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default AppSelect;`,
      },
    ],
  },
  {
    id: "input",
    title: "Input",
    blocks: [
      {
        id: "input-component",
        code: `import { Input } from "../ui/input"

const AppInput = ({
    label = "",
    labelClassName = "",
    id,
    required = false,
    error = "",
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className={\`text-sm \${labelClassName}\`}>
                    {label}
                    {required && (
                        <span className="text-[var(--destructive)]">*</span>
                    )}
                </label>
            )}
            <Input
                id={id}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error && id ? \`\${id}-error\` : undefined}
                {...props}
            />
            {error && (
                <p id={\`\${id}-error\`} className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}

export default AppInput;`,
      },
    ],
  },
  {
    id: "dialog",
    title: "Dialog",
    blocks: [
      {
        id: "dialog-confirm",
        code: `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isPending = false,
  confirmText = "Confirm",
  pendingText = "Processing...",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={<Button type="button" variant="outline" />}
          >
            Cancel
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? pendingText : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;`,
      },
    ],
  },
  {
    id: "app-entry",
    title: "App entry",
    description: "React root with React Query and the toaster.",
    blocks: [
      {
        id: "app-entry-main",
        label: "main.jsx",
        code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </StrictMode>,
)`,
      },
    ],
  },
  {
    id: "axios",
    title: "Axios",
    description: "The Axios client and the post calls that use it. Copy each file on its own.",
    blocks: [
      {
        id: "axios-client",
        label: "axios",
        code: `import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL,"base uel")

const Api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
})

export default Api;`,
      },
      {
        id: "axios-posts",
        label: "posts",
        code: `import Api from "@/lib/axios"

export const fetchPosts = async () => {
    const { data } = await Api.get("/posts");
    return data;
}

export const createPost = async (postData) => {
    const { data } = await Api.post("/posts", postData);
    return data;
}

export const updatePost = async ({ id, ...postData }) => {
  const { data } = await Api.patch(\`/posts/\${id}\`, postData);
  return data;
};

export const deletePost = async (id) => {
    const { data } = await Api.delete(\`/posts/\${id}\`)
    return data;
}`,
      },
    ],
  },
  {
    id: "optimistic-create",
    title: "Optimistic create",
    blocks: [
      {
        id: "optimistic-create-success",
        code: `        onSuccess: (newPost) => {
            queryClient.setQueryData(["posts"], (oldPosts) => [
                newPost,
                ...(oldPosts ?? []),
            ]);
            reset();
        },`,
      },
    ],
  },
  {
    id: "optimistic-delete",
    title: "Optimistic delete",
    blocks: [
      {
        id: "optimistic-delete-success",
        code: `        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(["posts"], (oldPosts) =>
                oldPosts?.filter((post) => post.id !== deletedId)
            );
            setPostToDelete(null);
        },`,
      },
    ],
  },
  ...PAGE_SNIPPETS,
];
