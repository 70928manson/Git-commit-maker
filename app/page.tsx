"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getAICommitMessage } from "@/lib/api";

export default function Home() {
  const [featType, setFeatType] = useState("feat");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [resolves, setResolves] = useState("");
  const [seeAlso, setSeeAlso] = useState("");
  const [fullCommit, setFullCommit] = useState("");
  const [aiSuggestion, setAISuggestion] = useState("");

  // 更新 Commit 訊息
  const updateFullCommit = () => {
    const footerParts = [];
    if (resolves) footerParts.push(`Resolves #${resolves}`);
    if (seeAlso) footerParts.push(`See also #${seeAlso}`);

    const commitMessage = `${featType}: ${title}\n\n${body}\n\n${footerParts.join("\n")}`;
    setFullCommit(commitMessage);
  };

  // 複製 Commit 訊息
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullCommit);
    alert("Commit message 已複製到剪貼簿！");
  };

  // 取得 AI 建議
  const fetchAISuggestion = async () => {
    const response = await getAICommitMessage(body || "撰寫 commit message");
    setAISuggestion(response);
  };

  return (
    <main className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Git Commit Message Maker</h1>

      {/* Feat Selector */}
      <div>
        <label className="text-sm font-medium">Feat Type</label>
        <Select onValueChange={(value) => setFeatType(value)} defaultValue="feat">
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="feat">feat</SelectItem>
            <SelectItem value="fix">fix</SelectItem>
            <SelectItem value="chore">chore</SelectItem>
            <SelectItem value="docs">docs</SelectItem>
            <SelectItem value="refactor">refactor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Title Input */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Body Input */}
      <div>
        <label className="text-sm font-medium">Body</label>
        <Textarea
          placeholder="Enter body (details)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      {/* Footer Inputs */}
      <div>
        <label className="text-sm font-medium">Resolves #Issue</label>
        <Input placeholder="123" value={resolves} onChange={(e) => setResolves(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium">See also #Issue</label>
        <Input placeholder="456" value={seeAlso} onChange={(e) => setSeeAlso(e.target.value)} />
      </div>

      {/* Generate Commit Button */}
      <Button
        onClick={updateFullCommit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        生成 Commit 訊息
      </Button>

      {/* Commit Message Preview */}
      {fullCommit && (
        <div className="p-4 border rounded bg-gray-50">
          <pre className="whitespace-pre-wrap">{fullCommit}</pre>
          <Button onClick={copyToClipboard} className="mt-2 w-full">
            複製 Commit 訊息
          </Button>
        </div>
      )}

      {/* AI Suggestion Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            ✨ AI 建議 Commit Message
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6">
          <h2 className="text-lg font-semibold mb-2">AI 建議 Commit 訊息</h2>
          <Button onClick={fetchAISuggestion} className="mb-4">
            生成 AI 建議
          </Button>
          <Textarea
            value={aiSuggestion}
            readOnly
            placeholder="AI 建議的 Commit 訊息會顯示在這裡"
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
