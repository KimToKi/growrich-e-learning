import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen gradient-bg text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"}}>
        </div>
        <div className="absolute inset-0 hero-gradient"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            {/* Logo */}
            <h1 className="text-4xl font-bold text-primary mb-8">LearnStream</h1>
            
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              แพลตฟอร์มการเรียนรู้
              <br />
              <span className="text-primary">องค์กรยุคใหม่</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              พัฒนาทักษะและความสามารถของทีมงานด้วยระบบการเรียนรู้ที่ออกแบบมาเป็นพิเศษ
              สำหรับองค์กรสมัยใหม่ พร้อมระบบติดตามความคืบหน้าแบบละเอียด
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg font-semibold"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-login"
              >
                เข้าสู่ระบบ
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-12 py-4 text-lg font-semibold"
                data-testid="button-learn-more"
              >
                เรียนรู้เพิ่มเติม
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            ทำไมต้องเลือก LearnStream?
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            เราสร้างแพลตฟอร์มที่ตอบโจทย์การเรียนรู้ในองค์กรแบบครบวงจร
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-graduation-cap text-2xl text-primary-foreground"></i>
              </div>
              <h4 className="text-xl font-semibold text-card-foreground mb-4">
                การเรียนรู้แบบมีโครงสร้าง
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                17 แพ็คเกจการเรียนรู้ที่เรียงลำดับตามระดับความยาก พร้อมระบบปลดล็อคแบบลำดับ
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-chart-line text-2xl text-accent-foreground"></i>
              </div>
              <h4 className="text-xl font-semibold text-card-foreground mb-4">
                ติดตามความคืบหน้า
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                ระบบติดตามการเรียนรู้แบบละเอียด พร้อมใบประกาศนียบัตรและระบบความสำเร็จ
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-2xl text-primary-foreground"></i>
              </div>
              <h4 className="text-xl font-semibold text-card-foreground mb-4">
                เนื้อหาตรงตามตำแหน่งงาน
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                ค้นหาและกรองเนื้อหาตามตำแหน่งงาน เพื่อการเรียนรู้ที่ตรงเป้าหมาย
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">LearnStream</h3>
            <p className="text-muted-foreground mb-6">
              แพลตฟอร์มการเรียนรู้องค์กรที่ออกแบบมาเพื่อพัฒนาทักษะและความสามารถของพนักงาน
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
              <p>&copy; 2024 LearnStream. สงวนลิขสิทธิ์</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
