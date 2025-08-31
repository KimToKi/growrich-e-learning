import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import VideoCard from "./video-card";

export default function StructuredPacks() {
  const { data: packs, isLoading } = useQuery({
    queryKey: ["/api/learning-packs"],
  });

  if (isLoading) {
    return (
      <section id="structured-packs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">แพ็คเกจการเรียนรู้แบบมีโครงสร้าง</h2>
          <p className="text-muted-foreground">คอร์สเรียนที่ออกแบบมาเป็นลำดับขั้นตอน เพื่อพัฒนาทักษะอย่างต่อเนื่อง</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <Card key={i} className="bg-card border-border">
              <div className="aspect-video bg-muted animate-pulse rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-2/3 mb-3"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-muted rounded animate-pulse w-16"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-12"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  const completedPacks = packs?.filter((pack: any) => pack.userProgress?.isCompleted).length || 0;
  const totalPacks = packs?.length || 17;
  const overallProgress = (completedPacks / totalPacks) * 100;

  return (
    <section id="structured-packs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">แพ็คเกจการเรียนรู้แบบมีโครงสร้าง</h2>
        <p className="text-muted-foreground">คอร์สเรียนที่ออกแบบมาเป็นลำดับขั้นตอน เพื่อพัฒนาทักษะอย่างต่อเนื่อง</p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">ความคืบหน้าโดยรวม</h3>
            <span className="text-sm text-muted-foreground" data-testid="text-overall-progress">
              {completedPacks}/{totalPacks} แพ็คเรียนจบแล้ว
            </span>
          </div>
          <Progress value={overallProgress} className="mb-4" data-testid="progress-overall" />
          <div className="text-sm text-muted-foreground" data-testid="text-overall-percentage">
            คุณเรียนจบแล้ว {Math.round(overallProgress)}% จากทั้งหมด
          </div>
        </CardContent>
      </Card>

      {/* Learning Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packs?.map((pack: any) => {
          const progress = pack.userProgress;
          const progressPercentage = progress ? (progress.completedVideos / 7) * 100 : 0;
          const isCurrentPack = pack.isUnlocked && !progress?.isCompleted;
          
          return (
            <VideoCard
              key={pack.id}
              id={pack.id}
              title={`แพ็ค ${pack.order}: ${pack.title}`}
              description={pack.description}
              thumbnailUrl={pack.thumbnailUrl || `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`}
              duration={`${pack.estimatedHours} ชม.`}
              extraInfo="7 วิดีโอ"
              href={`/pack/${pack.id}`}
              isLocked={!pack.isUnlocked}
              isCompleted={progress?.isCompleted}
              isCurrent={isCurrentPack}
              progress={progressPercentage}
              lockMessage={`เรียนจบแพ็ค ${pack.order - 1} เพื่อปลดล็อค`}
              testId={`pack-${pack.order}`}
            />
          );
        }) || Array.from({ length: 17 }, (_, index) => (
          <VideoCard
            key={index}
            id={`pack-${index + 1}`}
            title={`แพ็ค ${index + 1}: กำลังโหลด...`}
            description="กำลังโหลดข้อมูล..."
            thumbnailUrl="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
            duration="- ชม."
            extraInfo="7 วิดีโอ"
            href="#"
            isLocked={index > 0}
            testId={`pack-${index + 1}`}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Button 
          variant="secondary" 
          size="lg"
          className="px-8 py-3 font-semibold"
          data-testid="button-view-all-packs"
        >
          ดูแพ็คเรียนทั้งหมด (17 แพ็ค)
        </Button>
      </div>
    </section>
  );
}
