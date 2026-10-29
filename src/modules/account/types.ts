export type AccountSession = {
  id: string;
  device: string;
  location: string;
  lastActiveAt: string;
  current: boolean;
  kind: "desktop" | "mobile" | "tablet";
};

export type AccountProfile = {
  name: string;
  email: string;
  role: string;
  lastLoginAt: string;
  twoFactor: boolean;
};
