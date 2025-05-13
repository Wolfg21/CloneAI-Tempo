import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface AISetupWizardProps {
  onComplete?: (data: SetupData) => void;
}

interface SetupData {
  personality: {
    tone: string;
    style: string;
    traits: string[];
    energyLevel: number;
  };
  language: {
    formality: string;
    vocabulary: string;
    examples: string;
  };
  coaching: {
    methodology: string;
    approach: string;
    specialties: string[];
    sampleResponses: string;
  };
}

const AISetupWizard: React.FC<AISetupWizardProps> = ({
  onComplete = () => {},
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [setupData, setSetupData] = useState<SetupData>({
    personality: {
      tone: "friendly",
      style: "motivational",
      traits: ["empathetic", "encouraging"],
      energyLevel: 70,
    },
    language: {
      formality: "casual",
      vocabulary: "industry-specific",
      examples:
        "Hey there! Ready to crush your Instagram goals today? Let's get started with your content strategy!",
    },
    coaching: {
      methodology: "goal-oriented",
      approach: "supportive",
      specialties: ["content strategy", "engagement growth"],
      sampleResponses:
        "I noticed your engagement is down this week. Let's try posting at different times and using more engaging captions to boost your reach.",
    },
  });

  const steps = [
    {
      name: "Personality",
      description: "Configure your AI coach's personality traits",
    },
    {
      name: "Language Style",
      description: "Define how your AI coach communicates",
    },
    {
      name: "Coaching Methodology",
      description: "Set up your coaching approach and expertise",
    },
    { name: "Review", description: "Review and finalize your AI coach setup" },
  ];

  const updatePersonality = (field: string, value: any) => {
    setSetupData({
      ...setupData,
      personality: {
        ...setupData.personality,
        [field]: value,
      },
    });
  };

  const updateLanguage = (field: string, value: any) => {
    setSetupData({
      ...setupData,
      language: {
        ...setupData.language,
        [field]: value,
      },
    });
  };

  const updateCoaching = (field: string, value: any) => {
    setSetupData({
      ...setupData,
      coaching: {
        ...setupData.coaching,
        [field]: value,
      },
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(setupData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTraitToggle = (trait: string) => {
    const currentTraits = setupData.personality.traits;
    if (currentTraits.includes(trait)) {
      updatePersonality(
        "traits",
        currentTraits.filter((t) => t !== trait),
      );
    } else {
      updatePersonality("traits", [...currentTraits, trait]);
    }
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const currentSpecialties = setupData.coaching.specialties;
    if (currentSpecialties.includes(specialty)) {
      updateCoaching(
        "specialties",
        currentSpecialties.filter((s) => s !== specialty),
      );
    } else {
      updateCoaching("specialties", [...currentSpecialties, specialty]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI Coach Setup Wizard</CardTitle>
          <CardDescription>
            Configure your Instagram Coach AI clone in a few simple steps
          </CardDescription>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className="mt-2"
          />
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 justify-between">
            {steps.map((step, index) => (
              <div
                key={step.name}
                className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${index < currentStep ? "bg-primary text-primary-foreground" : index === currentStep ? "border-2 border-primary" : "border-2 border-muted"}`}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ))}
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">
                    Personality Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Define how your AI coach's personality should come across
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Tone</Label>
                    <RadioGroup
                      value={setupData.personality.tone}
                      onValueChange={(value) =>
                        updatePersonality("tone", value)
                      }
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friendly" id="tone-friendly" />
                        <Label htmlFor="tone-friendly">
                          Friendly & Approachable
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="professional"
                          id="tone-professional"
                        />
                        <Label htmlFor="tone-professional">
                          Professional & Formal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="direct" id="tone-direct" />
                        <Label htmlFor="tone-direct">
                          Direct & Straightforward
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Communication Style</Label>
                    <RadioGroup
                      value={setupData.personality.style}
                      onValueChange={(value) =>
                        updatePersonality("style", value)
                      }
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="motivational"
                          id="style-motivational"
                        />
                        <Label htmlFor="style-motivational">
                          Motivational & Inspiring
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="analytical"
                          id="style-analytical"
                        />
                        <Label htmlFor="style-analytical">
                          Analytical & Data-driven
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="nurturing"
                          id="style-nurturing"
                        />
                        <Label htmlFor="style-nurturing">
                          Nurturing & Supportive
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Personality Traits</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "empathetic",
                        "encouraging",
                        "patient",
                        "challenging",
                        "humorous",
                        "serious",
                        "creative",
                        "structured",
                      ].map((trait) => (
                        <Button
                          key={trait}
                          type="button"
                          variant={
                            setupData.personality.traits.includes(trait)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => handleTraitToggle(trait)}
                          className="justify-start capitalize"
                        >
                          {trait}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Select multiple traits that define your coaching style
                    </p>
                  </div>

                  <div>
                    <Label>
                      Energy Level: {setupData.personality.energyLevel}%
                    </Label>
                    <Slider
                      value={[setupData.personality.energyLevel]}
                      onValueChange={(value) =>
                        updatePersonality("energyLevel", value[0])
                      }
                      max={100}
                      step={10}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Calm & Measured</span>
                      <span>High Energy & Enthusiastic</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">
                    Language Style Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Define how your AI coach communicates with clients
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Formality Level</Label>
                    <RadioGroup
                      value={setupData.language.formality}
                      onValueChange={(value) =>
                        updateLanguage("formality", value)
                      }
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="casual" id="formality-casual" />
                        <Label htmlFor="formality-casual">
                          Casual & Conversational
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="balanced"
                          id="formality-balanced"
                        />
                        <Label htmlFor="formality-balanced">
                          Balanced & Adaptable
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="formal" id="formality-formal" />
                        <Label htmlFor="formality-formal">
                          Formal & Professional
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Vocabulary Style</Label>
                    <RadioGroup
                      value={setupData.language.vocabulary}
                      onValueChange={(value) =>
                        updateLanguage("vocabulary", value)
                      }
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="simple" id="vocab-simple" />
                        <Label htmlFor="vocab-simple">
                          Simple & Accessible
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="industry-specific"
                          id="vocab-industry"
                        />
                        <Label htmlFor="vocab-industry">
                          Industry-specific Terminology
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="technical"
                          id="vocab-technical"
                        />
                        <Label htmlFor="vocab-technical">
                          Technical & Detailed
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Language Examples</Label>
                    <Textarea
                      value={setupData.language.examples}
                      onChange={(e) =>
                        updateLanguage("examples", e.target.value)
                      }
                      placeholder="Provide examples of how your AI coach should communicate..."
                      className="mt-2 h-32"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Add sample phrases or messages that reflect your
                      communication style
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Coaching Methodology</h3>
                  <p className="text-sm text-muted-foreground">
                    Define your coaching approach and expertise areas
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Coaching Methodology</Label>
                    <RadioGroup
                      value={setupData.coaching.methodology}
                      onValueChange={(value) =>
                        updateCoaching("methodology", value)
                      }
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="goal-oriented"
                          id="method-goal"
                        />
                        <Label htmlFor="method-goal">
                          Goal-oriented & Results-focused
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="holistic" id="method-holistic" />
                        <Label htmlFor="method-holistic">
                          Holistic & Balanced Approach
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="strategic"
                          id="method-strategic"
                        />
                        <Label htmlFor="method-strategic">
                          Strategic & Systematic
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Coaching Approach</Label>
                    <RadioGroup
                      value={setupData.coaching.approach}
                      onValueChange={(value) =>
                        updateCoaching("approach", value)
                      }
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="supportive"
                          id="approach-supportive"
                        />
                        <Label htmlFor="approach-supportive">
                          Supportive & Encouraging
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="challenging"
                          id="approach-challenging"
                        />
                        <Label htmlFor="approach-challenging">
                          Challenging & Growth-focused
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="directive"
                          id="approach-directive"
                        />
                        <Label htmlFor="approach-directive">
                          Directive & Instructional
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Coaching Specialties</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "content strategy",
                        "engagement growth",
                        "audience building",
                        "monetization",
                        "personal branding",
                        "storytelling",
                        "analytics",
                        "visual aesthetics",
                      ].map((specialty) => (
                        <Button
                          key={specialty}
                          type="button"
                          variant={
                            setupData.coaching.specialties.includes(specialty)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => handleSpecialtyToggle(specialty)}
                          className="justify-start capitalize"
                        >
                          {specialty}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Select multiple specialties that your AI coach should
                      focus on
                    </p>
                  </div>

                  <div>
                    <Label>Sample Coaching Responses</Label>
                    <Textarea
                      value={setupData.coaching.sampleResponses}
                      onChange={(e) =>
                        updateCoaching("sampleResponses", e.target.value)
                      }
                      placeholder="Provide examples of coaching advice or feedback..."
                      className="mt-2 h-32"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Add sample coaching responses to help train your AI
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">
                    Review Your AI Coach Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review and confirm your AI coach setup before finalizing
                  </p>
                </div>

                <Tabs defaultValue="personality" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personality">Personality</TabsTrigger>
                    <TabsTrigger value="language">Language Style</TabsTrigger>
                    <TabsTrigger value="coaching">Coaching</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personality" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Tone</h4>
                        <p className="text-sm capitalize">
                          {setupData.personality.tone}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Communication Style</h4>
                        <p className="text-sm capitalize">
                          {setupData.personality.style}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Energy Level</h4>
                        <p className="text-sm">
                          {setupData.personality.energyLevel}%
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Personality Traits</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {setupData.personality.traits.map((trait) => (
                            <span
                              key={trait}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md capitalize"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="language" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Formality Level</h4>
                        <p className="text-sm capitalize">
                          {setupData.language.formality}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Vocabulary Style</h4>
                        <p className="text-sm capitalize">
                          {setupData.language.vocabulary}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Language Examples</h4>
                      <p className="text-sm p-3 bg-muted rounded-md mt-1">
                        {setupData.language.examples}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="coaching" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Coaching Methodology</h4>
                        <p className="text-sm capitalize">
                          {setupData.coaching.methodology}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Coaching Approach</h4>
                        <p className="text-sm capitalize">
                          {setupData.coaching.approach}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Specialties</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {setupData.coaching.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md capitalize"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Sample Coaching Responses</h4>
                      <p className="text-sm p-3 bg-muted rounded-md mt-1">
                        {setupData.coaching.sampleResponses}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="p-4 border rounded-md bg-muted/50">
                  <h4 className="font-medium flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    AI Coach Preview
                  </h4>
                  <div className="mt-3 p-4 bg-background rounded-md border">
                    <p className="italic text-sm">
                      {setupData.personality.tone === "friendly"
                        ? "Hey there! "
                        : setupData.personality.tone === "professional"
                          ? "Hello, "
                          : "Hi. "}
                      {setupData.coaching.methodology === "goal-oriented"
                        ? "Let's focus on your specific Instagram goals today. "
                        : setupData.coaching.methodology === "holistic"
                          ? "Let's look at your overall Instagram presence. "
                          : "I've analyzed your Instagram strategy. "}
                      {setupData.personality.style === "motivational"
                        ? "I believe you can achieve amazing results with the right approach! "
                        : setupData.personality.style === "analytical"
                          ? "Based on the data, we should adjust your strategy to optimize results. "
                          : "I'm here to support your Instagram journey every step of the way. "}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
            {currentStep < steps.length - 1 && (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AISetupWizard;
