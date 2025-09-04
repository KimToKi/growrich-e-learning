import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Landing() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <Card className="relative z-10 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-center">
            เข้าสู่แพลตฟอร์มการเรียนรู้ของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => (window.location.href = '/api/login')}>
            เข้าสู่ระบบด้วย Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
