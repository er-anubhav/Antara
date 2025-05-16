
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

export function SupportFAQ() {
  const faqs = [
    {
      question: "How confidential are these support services?",
      answer: "All our support services are completely confidential. Peer supporters are trained in privacy protocols, and no identifying information is stored from your conversations."
    },
    {
      question: "Can I talk to the same peer supporter each time?",
      answer: "Yes, we offer the option to request a specific peer supporter if you've had a positive experience. Just mention this at the beginning of your conversation."
    },
    {
      question: "What kind of training do the peer supporters receive?",
      answer: "Our peer supporters undergo a comprehensive 40-hour training program covering active listening, crisis management, mental health first aid, and appropriate referral pathways."
    },
    {
      question: "How quickly can I expect a response?",
      answer: "During regular hours (9am-9pm), you can expect to connect with a peer supporter within 5-10 minutes. Outside these hours, responses may take longer, but we aim to connect you within 30 minutes."
    },
    {
      question: "What if I need professional help beyond peer support?",
      answer: "Our peer supporters can help connect you with professional services when needed. We maintain relationships with campus counseling services and local mental health providers for seamless referrals."
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
