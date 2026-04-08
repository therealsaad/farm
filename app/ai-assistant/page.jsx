"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Send,
  Leaf,
  ArrowLeft,
  Sparkles,
  MapPin,
  Star,
  Users,
  Calendar,
  Mic,
  Paperclip,
  RotateCcw,
} from "lucide-react";
import { farmhouses } from "@/lib/data";

const suggestedQuestions = [
  "Find farmhouses with swimming pool in Lonavala",
  "Best farmhouse for a birthday party of 30 people",
  "Compare prices of farmhouses in Karjat",
  "Which farmhouse allows pets?",
  "Suggest a peaceful retreat for couples",
  "What are the cancellation policies?",
];

const aiResponses = {
  pool: {
    text: "I found 2 excellent farmhouses with swimming pools near Lonavala! Here are my top picks based on ratings and guest reviews:",
    farmhouses: ["fh-001", "fh-004"],
  },
  party: {
    text: "For a birthday party of 30 people, I recommend these farmhouses that offer great party amenities, music systems, and catering services:",
    farmhouses: ["fh-001", "fh-004", "fh-006"],
  },
  pets: {
    text: "Great news! I found farmhouses that welcome your furry friends. These pet-friendly properties also have spacious gardens:",
    farmhouses: ["fh-001", "fh-003"],
  },
  couples: {
    text: "For a romantic couples retreat, I recommend Serenity Springs -- it has natural springs, a spa, yoga deck, and a peaceful zen garden atmosphere:",
    farmhouses: ["fh-005"],
  },
  default: {
    text: "I'd be happy to help you find the perfect farmhouse! Based on our collection of premium properties, here are some recommendations that might interest you:",
    farmhouses: ["fh-001", "fh-002", "fh-003"],
  },
};

function getAIResponse(query) {
  const q = query.toLowerCase();
  if (q.includes("pool") || q.includes("swim")) return aiResponses.pool;
  if (q.includes("party") || q.includes("birthday") || q.includes("celebration"))
    return aiResponses.party;
  if (q.includes("pet") || q.includes("dog") || q.includes("cat"))
    return aiResponses.pets;
  if (q.includes("couple") || q.includes("romantic") || q.includes("peaceful") || q.includes("retreat"))
    return aiResponses.couples;
  return aiResponses.default;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm FunFarm's AI Assistant. I can help you discover the perfect farmhouse, compare options, check availability, and answer any questions about our properties. What are you looking for today?",
      farmhouses: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input, farmhouses: [] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(input);
      const matchedFarms = response.farmhouses
        .map((id) => farmhouses.find((f) => f.id === id))
        .filter(Boolean);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.text,
          farmhouses: matchedFarms,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <main className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">FunFarm AI</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-muted-foreground">Always online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs gap-1">
            <Sparkles className="h-3 w-3" />
            AI Powered
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  content:
                    "Hello! I'm FunFarm's AI Assistant. How can I help you today?",
                  farmhouses: [],
                },
              ])
            }
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] ${
                  msg.role === "user" ? "order-first" : ""
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border rounded-bl-md text-foreground"
                  }`}
                >
                  {msg.content}
                </div>

                {/* Farmhouse Cards */}
                {msg.farmhouses && msg.farmhouses.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.farmhouses.map((farm) => (
                      <Link
                        key={farm.id}
                        href={`/farmhouse/${farm.slug}`}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:shadow-md hover:border-primary/20"
                      >
                        <div className="h-16 w-20 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={farm.images[0]}
                            alt={farm.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm">{farm.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {farm.location.city}
                            </span>
                            <span className="flex items-center gap-0.5 text-xs">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              {farm.rating.average}
                            </span>
                            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                              <Users className="h-3 w-3" />
                              {farm.capacity.maxGuests}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-primary mt-0.5">
                            INR {farm.pricing.hourly["4hr"].toLocaleString("en-IN")}
                            <span className="text-xs font-normal text-muted-foreground"> /4hr</span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-accent/10 text-accent text-xs">
                    U
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-bl-md bg-card border border-border px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="border-t border-border bg-card/50 px-4 py-3 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => {
                      const userMessage = { role: "user", content: q, farmhouses: [] };
                      setMessages((prev) => [...prev, userMessage]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const response = getAIResponse(q);
                        const matchedFarms = response.farmhouses
                          .map((id) => farmhouses.find((f) => f.id === id))
                          .filter(Boolean);
                        setMessages((prev) => [
                          ...prev,
                          { role: "assistant", content: response.text, farmhouses: matchedFarms },
                        ]);
                        setIsTyping(false);
                      }, 1200);
                    }, 100);
                    setInput("");
                  }}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border bg-card px-4 py-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary transition-colors">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about farmhouses, pricing, amenities..."
                className="border-0 p-0 h-auto shadow-none focus-visible:ring-0 text-sm"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>
            </div>
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 rounded-xl shrink-0"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            AI responses are based on our farmhouse database. For real-time availability, please book or contact the host.
          </p>
        </div>
      </div>
    </main>
  );
}
