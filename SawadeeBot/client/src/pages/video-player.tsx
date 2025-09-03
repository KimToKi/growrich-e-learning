import { useParams, Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";

export default function VideoPlayer() {
  const { type, id } = useParams(); // type: 'pack' or 'general', id: video id
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [watchedDuration, setWatchedDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // For pack videos, we need to get the pack info
  const { data: packData } = useQuery<any>({
    queryKey: ["/api/learning-packs", "video", id],
    enabled: type === "pack",
    queryFn: async () => {
      // This would need a separate endpoint to get pack by video ID
      // For now, we'll simulate getting the pack info
      return null;
    },
  });

  // For general videos
  const { data: videoData, isLoading } = useQuery<any>({
    queryKey: type === "general" ? ["/api/general-videos", id] : ["/api/pack-videos", id],
    enabled: !!id,
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (data: { 
      videoId: string; 
      videoType: string; 
      watchedDuration: number; 
      isCompleted: boolean;
    }) => {
      await apiRequest("POST", "/api/progress/video", data);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login/google";
        }, 500);
        return;
      }
    },
  });

  // Update progress every 10 seconds while watching
  useEffect(() => {
    if (!id || !type) return;

    const interval = setInterval(() => {
      setWatchedDuration(prev => {
        const newDuration = prev + 10;
        updateProgressMutation.mutate({
          videoId: id,
          videoType: type,
          watchedDuration: newDuration,
          isCompleted: false,
        });
        return newDuration;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [id, type]);

  const handleCompleteVideo = () => {
    if (!id || !type) return;

    setIsCompleted(true);
    updateProgressMutation.mutate({
      videoId: id,
      videoType: type,
      watchedDuration,
      isCompleted: true,
    });

    toast({
      title: "เรียนจบวิดีโอแล้ว!",
      description: "คุณได้เรียนจบวิดีโอนี้เรียบร้อยแล้ว",
    });

    // Invalidate related queries
    if (type === "pack") {
      queryClient.invalidateQueries({ queryKey: ["/api/learning-packs"] });
    }
  };

  const handleBackClick = () => {
    if (type === "pack" && packData) {
      setLocation(`/pack/${packData.id}`);
    } else {
      setLocation("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">กำลังโหลดวิดีโอ...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-card-foreground mb-4">ไม่พบวิดีโอ</h1>
              <p className="text-muted-foreground mb-6">วิดีโอที่คุณค้นหาไม่มีอยู่ในระบบ</p>
              <Button onClick={handleBackClick} data-testid="button-back">กลับ</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBackClick}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-back"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              {type === "pack" ? "กลับไปแพ็คเรียน" : "กลับหน้าหลัก"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-3">
              <Card className="bg-card border-border mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                    {/* YouTube Player Placeholder */}
                    <div className="text-center text-white">
                      <i className="fas fa-play-circle text-6xl mb-4 opacity-50"></i>
                      <p className="text-lg">YouTube Player</p>
                      <p className="text-sm opacity-75">Video ID: {videoData.youtubeId}</p>
                      <Button 
                        className="mt-4 bg-red-600 hover:bg-red-700"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${videoData.youtubeId}`, '_blank')}
                        data-testid="button-youtube"
                      >
                        เปิดใน YouTube
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-2xl font-bold text-card-foreground" data-testid="text-video-title">
                        {videoData.title}
                      </h1>
                      {!isCompleted && (
                        <Button onClick={handleCompleteVideo} data-testid="button-complete-video">
                          <i className="fas fa-check mr-2"></i>
                          เรียนจบ
                        </Button>
                      )}
                      {isCompleted && (
                        <Badge className="bg-accent text-accent-foreground" data-testid="badge-completed">
                          <i className="fas fa-check mr-2"></i>
                          เรียนจบแล้ว
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-video-description">
                      {videoData.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span data-testid="text-video-duration">
                        ระยะเวลา: {Math.floor(videoData.duration / 60)}:{(videoData.duration % 60).toString().padStart(2, '0')}
                      </span>
                      {type === "general" && videoData.viewCount && (
                        <span data-testid="text-view-count">
                          ดู {videoData.viewCount.toLocaleString()} ครั้ง
                        </span>
                      )}
                      {videoData.category && (
                        <Badge variant="outline" data-testid="text-video-category">
                          {videoData.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracking */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">ความคืบหน้าการดู</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">เวลาที่ดูแล้ว</span>
                        <span className="text-card-foreground font-medium" data-testid="text-watched-duration">
                          {Math.floor(watchedDuration / 60)}:{(watchedDuration % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <Progress 
                        value={(watchedDuration / videoData.duration) * 100} 
                        className="h-2"
                        data-testid="progress-video"
                      />
                    </div>
                    
                    {isCompleted && (
                      <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="flex items-center text-accent">
                          <i className="fas fa-check-circle mr-2"></i>
                          <span className="font-medium">คุณได้เรียนจบวิดีโอนี้แล้ว!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {type === "pack" && packData && (
                <Card className="bg-card border-border mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">แพ็คเรียน</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-card-foreground mb-2" data-testid="text-pack-title">
                      {packData.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {packData.description}
                    </p>
                    <Link href={`/pack/${packData.id}`}>
                      <Button variant="outline" className="w-full" data-testid="button-view-pack">
                        ดูแพ็คเรียนทั้งหมด
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">วิดีโอแนะนำ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Placeholder for recommended videos */}
                    <div className="text-center text-muted-foreground py-8">
                      <i className="fas fa-video text-2xl mb-2"></i>
                      <p className="text-sm">วิดีโอแนะนำจะแสดงที่นี่</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
