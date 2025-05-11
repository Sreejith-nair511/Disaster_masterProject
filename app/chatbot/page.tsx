import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarInset } from "@/components/ui/sidebar"
import { ChatbotHeader } from "@/components/chatbot-header"
import { ChatbotInterface } from "@/components/chatbot-interface"

export default function ChatbotPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        <ChatbotHeader />
        <div className="p-4 h-[calc(100vh-4rem)]">
          <ChatbotInterface />
        </div>
      </SidebarInset>
      <MobileNav />
    </main>
  )
}
