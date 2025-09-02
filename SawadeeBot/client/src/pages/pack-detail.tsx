import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";

export default function PackDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: packData, isLoading } = useQuery({
    queryKey: ["/api/learning-packs", id],
    enabled: !!id,
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (data: { packId: string; completedVideos: number; isCompleted: boolean }) => {
      await apiRequest("POST", "/api/progress/pack", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/learning-packs", id] });
      queryClient.invalidateQueries({ queryKey: ["/api/learning-packs"] });
      toast({
        title: "บันทึกความคืบหน้า",
        description: "ความคืบหน้าของคุณได้รับการบันทึกแล้ว",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized", 
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกความคืบหน้าได้",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">กำลังโหลด...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!packData) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-card-foreground mb-4">ไม่พบแพ็คเรียน</h1>
              <p className="text-muted-foreground mb-6">แพ็คเรียนที่คุณค้นหาไม่มีอยู่ในระบบ</p>
              <Link href="/">
                <Button data-testid="button-back-home">กลับหน้าหลัก</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { userProgress, videos } = packData;
  const completedVideos = userProgress?.completedVideos || 0;
  const totalVideos = videos?.length || 8;
  const progressPercentage = (completedVideos / totalVideos) * 100;

  const handleCompleteVideo = (videoIndex: number) => {
    const newCompletedCount = Math.max(completedVideos, videoIndex + 1);
    const isCompleted = newCompletedCount >= totalVideos;
    
    updateProgressMutation.mutate({
      packId: id!,
      completedVideos: newCompletedCount,
      isCompleted,
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      <main className="pt-16">
        {/* Pack Header */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="button-back">
                <i className="fas fa-arrow-left mr-2"></i>
                กลับหน้าหลัก
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4" data-testid="text-pack-order">
                  แพ็คที่ {packData.order}
                </Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-pack-title">
                  {packData.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-pack-description">
                  {packData.description}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                <span data-testid="text-video-count">{totalVideos} วิดีโอ</span>
                <span data-testid="text-estimated-hours">{packData.estimatedHours} ชั่วโมง</span>
                {packData.targetPosition && (
                  <Badge variant="outline" data-testid="text-target-position">
                    {packData.targetPosition}
                  </Badge>
                )}
              </div>

              <Card className="bg-card border-border mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-card-foreground">ความคืบหน้า</h3>
                    <span className="text-sm text-muted-foreground" data-testid="text-progress-videos">
                      {completedVideos}/{totalVideos} วิดีโอ
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="mb-4" data-testid="progress-pack" />
                  <div className="text-sm text-muted-foreground" data-testid="text-progress-percentage">
                    เรียนจบแล้ว {Math.round(progressPercentage)}%
                  </div>
                  {userProgress?.isCompleted && (
                    <Badge className="mt-4 bg-accent text-accent-foreground" data-testid="badge-completed">
                      <i className="fas fa-check mr-2"></i>
                      เรียนจบแล้ว
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card border-border sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">เกี่ยวกับแพ็คนี้</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">จำนวนวิดีโอ:</span>
                      <span className="text-card-foreground font-medium">{totalVideos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ระยะเวลา:</span>
                      <span className="text-card-foreground font-medium">{packData.estimatedHours} ชั่วโมง</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ระดับ:</span>
                      <span className="text-card-foreground font-medium">
                        {packData.order <= 5 ? "เบื้องต้น" : packData.order <= 10 ? "กลาง" : "ขั้นสูง"}
                      </span>
                    </div>
                    {packData.targetPosition && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">เหมาะสำหรับ:</span>
                        <span className="text-card-foreground font-medium">{packData.targetPosition}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Video List */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">วิดีโอในแพ็ค</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {videos?.map((video: any, index: number) => (
              <Card 
                key={video.id} 
                className="bg-card border-border hover:border-primary/50 transition-colors group cursor-pointer"
                data-testid={`card-video-${index}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index < completedVideos 
                          ? 'bg-accent text-accent-foreground' 
                          : index === completedVideos 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {index < completedVideos ? (
                          <i className="fas fa-check" data-testid={`icon-video-completed-${index}`}></i>
                        ) : (
                          <span className="font-semibold" data-testid={`text-video-number-${index}`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid={`text-video-title-${index}`}>
                        {video.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2" data-testid={`text-video-description-${index}`}>
                        {video.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span data-testid={`text-video-duration-${index}`}>
                          {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                        </span>
                        {index < completedVideos && (
                          <Badge variant="secondary" className="text-xs" data-testid={`badge-video-completed-${index}`}>
                            เรียนจบแล้ว
                          </Badge>
                        )}
                        {index === completedVideos && (
                          <Badge className="text-xs bg-primary text-primary-foreground" data-testid={`badge-video-current-${index}`}>
                            ต่อไป
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {index <= completedVideos ? (
                        <Link href={`/video/pack/${video.id}`}>
                          <Button 
                            className="group-hover:bg-primary group-hover:text-primary-foreground"
                            data-testid={`button-watch-video-${index}`}
                          >
                            <i className="fas fa-play mr-2"></i>
                            {index < completedVideos ? "ดูอีกครั้ง" : "เริ่มเรียน"}
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          disabled 
                          variant="outline"
                          data-testid={`button-locked-video-${index}`}
                        >
                          <i className="fas fa-lock mr-2"></i>
                          ล็อค
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || Array.from({ length: 8 }, (_, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                      <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
