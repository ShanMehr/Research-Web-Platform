import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-20 items-center gap-2  transition-[width,height] ease-linear">
      <div className="flex gap-1 px-4 lg:gap-2 lg:px-6 bg-red-500">
        <SidebarTrigger className="absolute top-2 right-2" />
        {/* <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        /> */}
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <h1 className="text-base font-medium"></h1> */}
      </div>
    </header>
  );
}
