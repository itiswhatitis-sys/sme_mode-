"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Send, 
  ArrowUp, 
  Linkedin, 
  File, 
  User, 
  Zap, 
  Calendar, 
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Terra() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hi, I'm Terra AI, your intelligent recruiting assistant. How can I help you today?"
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    
    // Simulate assistant response (in a real app, this would call an API)
    setTimeout(() => {
      let response = "";
      if (message.toLowerCase().includes("candidate")) {
        response = "I can help you find suitable candidates based on your requirements. Would you like me to search for specific skills or qualifications?";
      } else if (message.toLowerCase().includes("interview")) {
        response = "I can help schedule interviews, prepare interview questions, or analyze interview feedback. What specific assistance do you need?";
      } else if (message.toLowerCase().includes("report") || message.toLowerCase().includes("analytics")) {
        response = "I can generate various recruitment reports and analytics for you. Would you like to see applicant trends, funnel metrics, or hiring efficiency data?";
      } else {
        response = "I'm here to assist with your recruitment needs. You can ask me about candidate sourcing, interviews, assessments, or recruitment analytics.";
      }
      
      setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
    
    // Clear input
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center">
            <Bot className="mr-2 h-6 w-6 text-primary" />
            Terra AI Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Your intelligent recruiting and talent acquisition partner
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="sources">Talent Sources</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 flex flex-col h-[600px] border rounded-lg overflow-hidden">
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        chat.role === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          chat.role === "assistant"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {chat.role === "assistant" && (
                          <div className="flex items-center mb-1">
                            <Bot className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Terra AI</span>
                          </div>
                        )}
                        <p className="text-sm">{chat.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Terra about recruitment, candidates, or analytics..."
                    className="min-h-[60px]"
                  />
                  <Button size="icon" onClick={handleSendMessage} className="h-[60px]">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <div>Terra AI supports natural language queries</div>
                  <div className="flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 
                    <span>Shift + Enter for new line</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm" onClick={() => {
                    setChatHistory([...chatHistory, { role: "user", content: "Find candidates for Software Developer position" }, { role: "assistant", content: "I'll help you find suitable candidates for the Software Developer position. Could you specify any particular skills or experience you're looking for?" }]);
                  }}>
                    <User className="h-4 w-4 mr-2" />
                    Find candidates
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" onClick={() => {
                    setChatHistory([...chatHistory, { role: "user", content: "Schedule interviews for shortlisted candidates" }, { role: "assistant", content: "I can help schedule interviews for your shortlisted candidates. Would you like me to suggest available time slots based on your calendar?" }]);
                  }}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule interviews
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" onClick={() => {
                    setChatHistory([...chatHistory, { role: "user", content: "Generate recruitment report for this month" }, { role: "assistant", content: "I'll generate a recruitment report for this month. The report will include application statistics, interview completion rates, offer acceptances, and time-to-hire metrics. Would you like to include any specific data in the report?" }]);
                  }}>
                    <File className="h-4 w-4 mr-2" />
                    Generate reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" onClick={() => {
                    setChatHistory([...chatHistory, { role: "user", content: "Get hiring insights and analytics" }, { role: "assistant", content: "Based on your recent hiring activities, I've noticed a few trends: 1) Frontend developer roles have a 23% higher application rate, 2) Technical interviews have a 15% higher completion rate on Tuesdays and Thursdays, 3) Your average time-to-hire has decreased by 4 days this quarter. Would you like more details on any of these insights?" }]);
                  }}>
                    <Zap className="h-4 w-4 mr-2" />
                    Get insights
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Integrated Platforms</CardTitle>
                  <CardDescription>Connect recruitment sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="text-sm">LinkedIn</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path d="M8 12l2 2 6-6" />
                      </svg>
                      <span className="text-sm">Naukri</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-blue-800" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                      <span className="text-sm">Indeed</span>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-xs">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-green-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                      </svg>
                      <span className="text-sm">Email Parsing</span>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-xs">Connect</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Resume Parsing</span>
                      <Badge variant="secondary" className="text-primary">Active</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span>Candidate Matching</span>
                      <Badge variant="secondary" className="text-primary">Active</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span>Interview Scheduling</span>
                      <Badge variant="secondary" className="text-primary">Active</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span>Sentiment Analysis</span>
                      <Badge variant="outline">Upgrade</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span>Market Intelligence</span>
                      <Badge variant="outline">Upgrade</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="text-center py-12">
            <Bot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">AI-Powered Recruitment Insights</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Access predictive analytics, candidate market trends, and performance benchmarks.
            </p>
            <Button className="mt-4">Generate Insights</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="sources">
          <div className="text-center py-12">
            <Linkedin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">Talent Source Integration</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Connect and manage your recruitment sources including job boards, social media, and referral networks.
            </p>
            <Button className="mt-4">Manage Sources</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="text-center py-12">
            <Settings className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">AI Assistant Settings</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Customize Terra AI&apos;s behavior, preferences, and data sources.
            </p>
            <Button className="mt-4">Configure Assistant</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}