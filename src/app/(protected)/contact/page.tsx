
import ContactPage from "@/components/contacts/contact-page";
import { Card } from "@/components/ui/card";

export default async function ContactsPage() {
  return (
    <Card className="min-h-[calc(100dvh-8rem)] overflow-hidden border-border bg-background p-0">
      <ContactPage />
    </Card>
  );
}
