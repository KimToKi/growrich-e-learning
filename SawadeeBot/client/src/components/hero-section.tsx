import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  const { data: dashboardData } = useQuery({
    queryKey: ["/api/dashboard"],
  });

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Hero background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
        }}
      ></div>
      <div className="absolute inset-0 hero-gradient"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            การพัฒนาทักษะ
            <br />
            <span className="text-primary">ผู้นำองค์กร</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            ยกระดับความสามารถด้านการบริหารจัดการและภาวะผู้นำ สำหรับผู้บริหารระดับกลางและระดับสูง
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold"
              onClick={() => document.getElementById('structured-packs')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-start-learning"
            >
              <i className="fas fa-play mr-2"></i>
              เริ่มเรียนต่อ
            </Button>
            <Button 
              size="lg"
              variant="secondary"
              className="px-8 py-3 font-semibold"
              onClick={() => document.getElementById('general-content')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-view-details"
            >
              ดูรายละเอียด
            </Button>
          </div>

          {/* Progress Summary */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">ความคืบหน้าของคุณ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent" data-testid="text-completed-packs">
                    {dashboardData?.completedPacks || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">แพ็คเรียนจบแล้ว</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-total-videos">
                    {dashboardData?.totalVideosWatched || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">วิดีโอที่ดูแล้ว</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground" data-testid="text-learning-hours">
                    {dashboardData?.learningHours || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">ชั่วโมงการเรียน</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
