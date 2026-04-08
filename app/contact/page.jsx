"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AIChatbot from "@/components/ai-chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Bot,
  MessageCircle,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="bg-primary/5 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Get in Touch
            </h1>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Have questions about farmhouse bookings, partnerships, or anything else?
              We are here to help.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    detail: "support@funfarm.com",
                    sub: "We reply within 24 hours",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    detail: "+91 98765 43210",
                    sub: "Mon-Sat, 9AM-8PM IST",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    detail: "Mumbai, Maharashtra",
                    sub: "By appointment only",
                  },
                  {
                    icon: MessageCircle,
                    title: "WhatsApp",
                    detail: "+91 98765 43210",
                    sub: "Quick responses",
                  },
                ].map(({ icon: Icon, title, detail, sub }) => (
                  <Card key={title}>
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{title}</p>
                        <p className="text-sm text-foreground">{detail}</p>
                        <p className="text-xs text-muted-foreground">{sub}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">AI Instant Help</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Get instant answers from our AI assistant.
                      </p>
                      <Button size="sm" className="mt-2 gap-1 text-xs" asChild>
                        <a href="/ai-assistant">
                          <Headphones className="h-3 w-3" />
                          Ask AI
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                        <Send className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Full Name
                          </label>
                          <Input placeholder="Your name" required />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Email
                          </label>
                          <Input type="email" placeholder="you@example.com" required />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Phone (optional)
                          </label>
                          <Input type="tel" placeholder="+91 98765 43210" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">
                            Subject
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="booking">Booking Inquiry</SelectItem>
                              <SelectItem value="listing">List My Farmhouse</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Message
                        </label>
                        <Textarea
                          placeholder="Tell us how we can help..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <AIChatbot />
    </main>
  );
}
