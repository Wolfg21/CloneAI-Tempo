import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  PlusCircle,
  BookOpen,
  Zap,
} from "lucide-react";
import AISetupWizard from "../setup/AISetupWizard";

interface DashboardMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

interface RecentActivity {
  id: string;
  type: "message" | "signup" | "training" | "setup";
  description: string;
  time: string;
}

interface Client {
  id: string;
  name: string;
  avatar: string;
  lastActive: string;
  engagementScore: number;
}

const CoachDashboard = () => {
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  // Mock data
  const metrics: DashboardMetric[] = [
    { label: "Total Clients", value: 24, change: "+3", trend: "up" },
    { label: "Active Conversations", value: 12, change: "+2", trend: "up" },
    { label: "AI Accuracy", value: "87%", change: "+5%", trend: "up" },
    { label: "Training Samples", value: 156, change: "+12", trend: "up" },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "message",
      description: "Sarah received 5 new messages from your AI",
      time: "10 min ago",
    },
    {
      id: "2",
      type: "signup",
      description: "New client John signed up",
      time: "1 hour ago",
    },
    {
      id: "3",
      type: "training",
      description: "AI training completed with 95% accuracy",
      time: "3 hours ago",
    },
    {
      id: "4",
      type: "setup",
      description: "Language style configuration updated",
      time: "5 hours ago",
    },
  ];

  const clients: Client[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastActive: "10 min ago",
      engagementScore: 92,
    },
    {
      id: "2",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      lastActive: "1 hour ago",
      engagementScore: 78,
    },
    {
      id: "3",
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      lastActive: "2 days ago",
      engagementScore: 65,
    },
    {
      id: "4",
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      lastActive: "3 days ago",
      engagementScore: 45,
    },
  ];

  const aiSetupProgress = 65;

  return (
    <div className="bg-background min-h-screen">
      {showSetupWizard ? (
        <AISetupWizard onClose={() => setShowSetupWizard(false)} />
      ) : (
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Coach Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your AI clone and client interactions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">Help</Button>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=coach"
                  alt="Coach"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{metric.value}</h3>
                      {metric.change && (
                        <Badge
                          variant={
                            metric.trend === "up" ? "default" : "destructive"
                          }
                          className="text-xs"
                        >
                          {metric.change}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* AI Setup Status */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>AI Clone Setup</CardTitle>
                        <Button
                          onClick={() => setShowSetupWizard(true)}
                          variant="default"
                        >
                          Continue Setup
                        </Button>
                      </div>
                      <CardDescription>
                        Complete your AI clone configuration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Setup Progress</span>
                          <span className="font-medium">
                            {aiSetupProgress}%
                          </span>
                        </div>
                        <Progress value={aiSetupProgress} className="h-2" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="w-6 h-6 flex items-center justify-center p-0 rounded-full"
                            >
                              ✓
                            </Badge>
                            <span className="text-sm">Personality</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="w-6 h-6 flex items-center justify-center p-0 rounded-full"
                            >
                              ✓
                            </Badge>
                            <span className="text-sm">Language Style</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="w-6 h-6 flex items-center justify-center p-0 rounded-full"
                            >
                              ...
                            </Badge>
                            <span className="text-sm">Coaching Methods</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest interactions with your AI clone
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-4"
                          >
                            <div className="bg-primary/10 p-2 rounded-full">
                              {activity.type === "message" && (
                                <MessageSquare className="h-4 w-4" />
                              )}
                              {activity.type === "signup" && (
                                <Users className="h-4 w-4" />
                              )}
                              {activity.type === "training" && (
                                <BookOpen className="h-4 w-4" />
                              )}
                              {activity.type === "setup" && (
                                <Settings className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-sm">
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="training" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Training Module</CardTitle>
                      <CardDescription>
                        Upload content to improve your AI clone
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-dashed border-2 p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors">
                          <PlusCircle className="h-8 w-8 text-muted-foreground" />
                          <p className="font-medium">Upload Content</p>
                          <p className="text-xs text-muted-foreground text-center">
                            Drag and drop or click to upload Instagram posts,
                            captions, or videos
                          </p>
                        </Card>
                        <Card className="border-dashed border-2 p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors">
                          <Zap className="h-8 w-8 text-muted-foreground" />
                          <p className="font-medium">Quick Training</p>
                          <p className="text-xs text-muted-foreground text-center">
                            Answer questions to help your AI learn your coaching
                            style
                          </p>
                        </Card>
                      </div>

                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Training Progress
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Personality Accuracy</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-1" />

                          <div className="flex justify-between text-xs">
                            <span>Language Style</span>
                            <span>87%</span>
                          </div>
                          <Progress value={87} className="h-1" />

                          <div className="flex justify-between text-xs">
                            <span>Coaching Knowledge</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} className="h-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analytics Dashboard</CardTitle>
                      <CardDescription>
                        Track client engagement with your AI clone
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded-md">
                        <div className="text-center">
                          <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                          <h3 className="mt-2 font-medium">
                            Analytics Visualization
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Detailed charts and metrics would appear here
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Settings</CardTitle>
                      <CardDescription>
                        Configure your AI clone behavior
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">AI Availability</h4>
                            <p className="text-sm text-muted-foreground">
                              Control when your AI is available to clients
                            </p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Response Style</h4>
                            <p className="text-sm text-muted-foreground">
                              Adjust how your AI responds to clients
                            </p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Topic Restrictions</h4>
                            <p className="text-sm text-muted-foreground">
                              Set boundaries for conversation topics
                            </p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Add New Client</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Preview AI Clone</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Export Analytics</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Top Clients */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Clients</CardTitle>
                  <CardDescription>
                    Based on engagement with your AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>
                            {client.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Last active: {client.lastActive}
                          </p>
                        </div>
                        <Badge
                          variant={
                            client.engagementScore > 80 ? "default" : "outline"
                          }
                        >
                          {client.engagementScore}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-sm">
                    View All Clients
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachDashboard;
