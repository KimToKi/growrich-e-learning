import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardData {
  completedPacks?: number;
  totalVideosWatched?: number;
  learningHours?: number;
  weeklyProgress?: {
    videosWatched?: number;
    hoursLearned?: number;
    packsCompleted?: number;
    streak?: number;
  };
}

export default function UserDashboard() {
  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  const { data: achievements = [] } = useQuery<any[]>({
    queryKey: ["/api/achievements"],
  });

  if (isLoading) {
    return (
      <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">ความคืบหน้าของคุณ</h2>
          <p className="text-muted-foreground">ติดตามผลการเรียนรู้และความสำเร็จของคุณ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="text-center">
                      <div className="h-8 bg-muted rounded animate-pulse mb-2 mx-auto w-12"></div>
                      <div className="h-3 bg-muted rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const weeklyProgress = dashboardData?.weeklyProgress || {
    videosWatched: 0,
    hoursLearned: 0,
    packsCompleted: 0,
    streak: 0,
  };

  return (
    <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">ความคืบหน้าของคุณ</h2>
        <p className="text-muted-foreground">ติดตามผลการเรียนรู้และความสำเร็จของคุณ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Progress */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">สถิติการเรียนรู้สัปดาห์นี้</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-weekly-videos">
                    {weeklyProgress.videosWatched}
                  </div>
                  <div className="text-sm text-muted-foreground">วิดีโอที่ดู</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent" data-testid="text-weekly-hours">
                    {weeklyProgress.hoursLearned}
                  </div>
                  <div className="text-sm text-muted-foreground">ชั่วโมงเรียน</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground" data-testid="text-weekly-packs">
                    {weeklyProgress.packsCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">แพ็คเรียนจบ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-streak">
                    {weeklyProgress.streak}
                  </div>
                  <div className="text-sm text-muted-foreground">วันติดต่อกัน</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">กิจกรรมล่าสุด</h3>
              <div className="space-y-4">
                {achievements?.slice(0, 5).map((achievement: any, index: number) => (
                  <div key={achievement.id} className="flex items-center space-x-4" data-testid={`activity-${index}`}>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                      <i className={`fas ${achievement.type === "pack_completion" ? "fa-certificate" : "fa-play"} text-primary text-sm`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground" data-testid={`activity-title-${index}`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-muted-foreground" data-testid={`activity-time-${index}`}>
                        {new Date(achievement.earnedAt).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                    <div className="text-accent">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  </div>
                )) || (
                  <div className="text-center text-muted-foreground py-8">
                    <i className="fas fa-clock text-2xl mb-4"></i>
                    <p>ยังไม่มีกิจกรรมล่าสุด</p>
                    <p className="text-sm">เริ่มเรียนเพื่อดูกิจกรรมของคุณ</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements and Certificates */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">ความสำเร็จ</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    (weeklyProgress.streak ?? 0) >= 7 ? 'bg-accent' : 'bg-muted'
                  }`}>
                    <i className={`fas fa-fire ${(weeklyProgress.streak ?? 0) >= 7 ? 'text-accent-foreground' : 'text-muted-foreground'}`}></i>
                  </div>
                  <p className="text-xs text-muted-foreground">เรียนต่อเนื่อง 7 วัน</p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    (dashboardData?.completedPacks || 0) >= 3 ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <i className={`fas fa-star ${(dashboardData?.completedPacks || 0) >= 3 ? 'text-primary-foreground' : 'text-muted-foreground'}`}></i>
                  </div>
                  <p className="text-xs text-muted-foreground">เรียนจบ 3 แพ็ค</p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    (dashboardData?.learningHours || 0) >= 50 ? 'bg-accent' : 'bg-muted'
                  }`}>
                    <i className={`fas fa-clock ${(dashboardData?.learningHours || 0) >= 50 ? 'text-accent-foreground' : 'text-muted-foreground'}`}></i>
                  </div>
                  <p className="text-xs text-muted-foreground">เรียน 50 ชั่วโมง</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">ใบประกาศนียบัตร</h3>
              <div className="space-y-3">
                {achievements?.filter((a: any) => a.type === "pack_completion").slice(0, 3).map((cert: any, index: number) => (
                  <div key={cert.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg" data-testid={`certificate-${index}`}>
                    <i className="fas fa-certificate text-accent"></i>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground" data-testid={`cert-title-${index}`}>
                        {cert.title}
                      </p>
                      <p className="text-xs text-muted-foreground" data-testid={`cert-date-${index}`}>
                        เรียนจบเมื่อ {new Date(cert.earnedAt).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary hover:text-primary/80 text-xs"
                      data-testid={`button-download-cert-${index}`}
                    >
                      <i className="fas fa-download"></i>
                    </Button>
                  </div>
                )) || (
                  <div className="text-center text-muted-foreground py-8">
                    <i className="fas fa-certificate text-2xl mb-4"></i>
                    <p>ยังไม่มีใบประกาศนียบัตร</p>
                    <p className="text-sm">เรียนจบแพ็คเรียนเพื่อรับใบประกาศนียบัตร</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
