"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  context: z.string().min(2, {
    message: "Context must be at least 2 characters.",
  }),
});

const translationSchema = z.object({
  translation: z.string().min(1, {
    message: "Translation cannot be empty.",
  }),
});

export default function LanguageLearningPage() {
  const [sentence, setSentence] = useState<string>("");
  const [correctTranslation, setCorrectTranslation] = useState<string>("");
  const [, setUserTranslation] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCorrectTranslation, setShowCorrectTranslation] =
    useState<boolean>(false);

  const contextForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      context: "",
    },
  });

  const translationForm = useForm<z.infer<typeof translationSchema>>({
    resolver: zodResolver(translationSchema),
    defaultValues: {
      translation: "",
    },
  });

  async function onSubmitContext(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: values.context }),
      });
      const data = await response.json();
      setSentence(data.sentence);
      setCorrectTranslation("");
      setUserTranslation("");
      setFeedback("");
      setShowCorrectTranslation(false);
      translationForm.reset();
    } catch (error) {
      console.error("Failed to generate sentence:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmitTranslation(
    values: z.infer<typeof translationSchema>
  ) {
    setIsLoading(true);
    setUserTranslation(values.translation);
    try {
      const response = await fetch("/api/check-translation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          polishSentence: sentence,
          userTranslation: values.translation,
        }),
      });
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      console.error("Failed to check translation:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRevealTranslation() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence }),
      });
      const data = await response.json();
      setCorrectTranslation(data.translation);
      setShowCorrectTranslation(true);
    } catch (error) {
      console.error("Failed to translate:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Polish to English Language Learning
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate a Sentence</CardTitle>
          <CardDescription>
            Provide context for the AI to generate a Polish sentence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...contextForm}>
            <form
              onSubmit={contextForm.handleSubmit(onSubmitContext)}
              className="space-y-8"
            >
              <FormField
                control={contextForm.control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Context</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. greetings, food, weather"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a topic or context for the sentence you want to
                      learn.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Sentence"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {sentence && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Translate the Sentence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold mb-4">{sentence}</p>
            <Form {...translationForm}>
              <form
                onSubmit={translationForm.handleSubmit(onSubmitTranslation)}
                className="space-y-8"
              >
                <FormField
                  control={translationForm.control}
                  name="translation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Translation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your translation here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Checking..." : "Check Translation"}
                </Button>
              </form>
            </Form>
            {feedback && (
              <Alert className="mt-4">
                <AlertTitle>Feedback</AlertTitle>
                <AlertDescription>
                  <ReactMarkdown className="prose dark:prose-invert">
                    {feedback}
                  </ReactMarkdown>
                </AlertDescription>
              </Alert>
            )}
            {showCorrectTranslation && correctTranslation && (
              <Alert className="mt-4">
                <AlertTitle>Correct Translation</AlertTitle>
                <AlertDescription>{correctTranslation}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleRevealTranslation}
              disabled={isLoading || showCorrectTranslation}
            >
              {isLoading ? "Translating..." : "Reveal Correct Translation"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
