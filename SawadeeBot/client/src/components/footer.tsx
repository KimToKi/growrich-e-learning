export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">LearnStream</h3>
            <p className="text-muted-foreground mb-4">
              แพลตฟอร์มการเรียนรู้องค์กรที่ออกแบบมาเพื่อพัฒนาทักษะและความสามารถของพนักงานอย่างมีประสิทธิภาพ
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">เนื้อหาการเรียน</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#structured-packs" className="hover:text-foreground transition-colors" data-testid="link-learning-packs">
                  แพ็คเกจการเรียน
                </a>
              </li>
              <li>
                <a href="#general-content" className="hover:text-foreground transition-colors" data-testid="link-general-content">
                  เนื้อหาทั่วไป
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-foreground transition-colors" data-testid="link-certificates">
                  ใบประกาศนียบัตร
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-foreground transition-colors" data-testid="link-progress">
                  ความคืบหน้า
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">ช่วยเหลือ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-guide">
                  คู่มือการใช้งาน
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-faq">
                  คำถามที่พบบ่อย
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-support">
                  ติดต่อสนับสนุน
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                  ข้อกำหนดการใช้งาน
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 LearnStream. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
}
