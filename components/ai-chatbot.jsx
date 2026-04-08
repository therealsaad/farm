"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  X,
  Send,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Loader2,
} from "lucide-react";

const aiResponses = [
  {
    trigger: ["hello", "hi", "hey"],
    response:
      "Welcome to FunFarm! I'm your AI assistant. I can help you find the perfect farmhouse, check availability, get pricing info, or answer any questions. What are you looking for?",
  },
  {
    trigger: ["pool", "swimming"],
    response:
      "Great choice! We have 48 farmhouses with swimming pools. Top picks include Sunset Valley Estate in Lonavala (infinity pool, rated 4.8) and Royal Orchid Villa in Nashik (heated pool, rated 4.7). Want me to show you more details?",
  },
  {
    trigger: ["lonavala", "karjat", "alibaug", "location", "where"],
    response:
      "We have farmhouses across popular destinations! Lonavala (34 listings), Karjat (28), Nashik (25), Alibaug (22), Igatpuri (19), and Panchgani (15). Which location interests you?",
  },
  {
    trigger: ["price", "cost", "budget", "cheap", "affordable"],
    response:
      "Our farmhouses range from INR 4,000 for a 4-hour slot to INR 55,000 for a full-day luxury estate. For budget-friendly options, I recommend Serenity Springs starting at INR 4,000 or Riverside Retreat at INR 5,000. Want me to filter by your budget?",
  },
  {
    trigger: ["book", "booking", "reserve"],
    response:
      "I can help you with booking! Just tell me: 1) Your preferred location, 2) Date & duration, 3) Number of guests, and I'll find the best options for you with instant pricing.",
  },
  {
    trigger: ["group", "party", "large", "corporate"],
    response:
      "For large groups, I recommend Green Meadows Farm (up to 80 guests, cricket turf included!) or Royal Orchid Villa (up to 100 guests with a ballroom). Both have excellent catering options. Shall I check availability?",
  },
  {
    trigger: ["pet", "dog"],
    response:
      "We have 22 pet-friendly farmhouses! Sunset Valley Estate and Hilltop Haven both welcome pets. They have spacious gardens perfect for your furry friends. Want to see the full list?",
  },
  {
    trigger: ["food", "catering", "meal"],
    response:
      "Most of our farmhouses offer meal packages - breakfast (INR 200-500), lunch (INR 350-800), and dinner (INR 400-1000). Options include vegetarian, non-vegetarian, BBQ, and farm-to-table dining. Some also allow you to use the kitchen. Which farmhouse are you interested in?",
  },
];

function getAIResponse(message) {
  const lower = message.toLowerCase();
  for (const item of aiResponses) {
    if (item.trigger.some((t) => lower.includes(t))) {
      return item.response;
    }
  }
  return "I'd love to help you find the perfect farmhouse! You can ask me about locations, pricing, amenities (like pools, sports, gardens), group bookings, food options, or anything else. What would you like to know?";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm FunFarm AI. I can help you discover the perfect farmhouse, check pricing, and even suggest hidden gems. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage.content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const quickActions = [
    { label: "Find with Pool", icon: "waves" },
    { label: "Budget Friendly", icon: "wallet" },
    { label: "Group Booking", icon: "users" },
    { label: "Pet Friendly", icon: "paw" },
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          aria-label="Open AI Chat"
        >
          <Bot className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
            AI
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-6 sm:right-6 max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:top-0 max-sm:h-full max-sm:w-full max-sm:rounded-none">
          <div className="flex items-center justify-between border-b border-border bg-primary p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary-foreground">
                  FunFarm AI
                </h3>
                <p className="text-xs text-primary-foreground/70">
                  Your smart farmhouse finder
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 rounded-bl-md">
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    setInput(action.label);
                    setTimeout(() => {
                      const userMessage = { role: "user", content: action.label };
                      setMessages((prev) => [...prev, userMessage]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const response = getAIResponse(action.label);
                        setMessages((prev) => [
                          ...prev,
                          { role: "assistant", content: response },
                        ]);
                        setIsTyping(false);
                      }, 800 + Math.random() * 1200);
                    }, 100);
                    setInput("");
                  }}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about farmhouses..."
                className="flex-1 rounded-full border-border bg-secondary text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0 rounded-full"
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
