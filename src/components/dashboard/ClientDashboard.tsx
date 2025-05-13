import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Clock, User, Settings, LogOut } from "lucide-react";

interface Coach {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  status: 'active' | 'offline';
}

interface Conversation {
  id: string;
  coachId: string;
  coachName: string;
  coachAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('coaches');
  
  // Mock data for coaches
  const coaches: Coach[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Content Strategy',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Peterson',
      specialty: 'Growth Hacking',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      status: 'active'
    },
    {
      id: '3',
      name: 'Emma Roberts',
      specialty: 'Engagement Strategy',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      status: 'offline'
    },
  ];

  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: '101',
      coachId: '1',
      coachName: 'Sarah Johnson',
      coachAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'Let me know when you\'re ready to discuss your content calendar.',
      timestamp: '10:30 AM',
      unread: true
    },
    {
      id: '102',
      coachId: '2',
      coachName: 'Mike Peterson',
      coachAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      lastMessage: 'I've analyzed your account growth and have some suggestions.',
      timestamp: 'Yesterday',
      unread: false
    },
    {
      id: '103',
      coachId: '3',
      coachName: 'Emma Roberts',
      coachAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      lastMessage: 'Your engagement rate has improved by 15% this week!',
      timestamp: 'Monday',
      unread: false
    },
  ];

  const handleStartChat = (coachId: string) => {
    console.log(`Starting chat with coach ID: ${coachId}`);
    // Navigation logic would go here
  };

  const handleOpenConversation = (conversationId: string) => {
    console.log(`Opening conversation ID: ${conversationId}`);
    // Navigation logic would go here
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Instagram Coach AI</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=client" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Access your coaching resources</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('coaches')}>
                    <User className="mr-2 h-4 w-4" />
                    My Coaches
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('conversations')}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Conversations
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Session History
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>Continue your coaching journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="coaches">Available Coaches</TabsTrigger>
                    <TabsTrigger value="conversations">Recent Conversations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="coaches" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {coaches.map((coach) => (
                        <Card key={coach.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={coach.avatarUrl} />
                                <AvatarFallback>{coach.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <Badge variant={coach.status === 'active' ? 'default' : 'outline'}>
                                {coach.status === 'active' ? 'Online' : 'Offline'}
                              </Badge>
                            </div>
                            <CardTitle className="mt-2">{coach.name}</CardTitle>
                            <CardDescription>{coach.specialty}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button 
                              className="w-full" 
                              onClick={() => handleStartChat(coach.id)}
                              disabled={coach.status !== 'active'}
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Start Chat
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conversations" className="mt-6">
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        {conversations.map((conversation) => (
                          <Card 
                            key={conversation.id} 
                            className={`cursor-pointer hover:bg-accent/50 ${conversation.unread ? 'border-primary' : ''}`}
                            onClick={() => handleOpenConversation(conversation.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <Avatar>
                                  <AvatarImage src={conversation.coachAvatar} />
                                  <AvatarFallback>{conversation.coachName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium">{conversation.coachName}</h4>
                                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-1">
                                    {conversation.lastMessage}
                                  </p>
                                  {conversation.unread && (
                                    <div className="mt-1">
                                      <Badge variant="default" className="text-xs">New</Badge>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
        <p>© 2023 Instagram Coach AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClientDashboard;
