import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
 
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar>
      {/* <SidebarTrigger className="absolute top-2 right-2" /> */}
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}