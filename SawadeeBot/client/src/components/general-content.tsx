import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchFilters from "./search-filters";
import VideoCard from "./video-card";

export default function GeneralContent() {
  const [filters, setFilters] = useState({
    search: "",
    position: "",
    category: "",
  });

  const { data: videos, isLoading } = useQuery({
    queryKey: ["/api/general-videos", filters.category, filters.position, filters.search],
  });

  const categorizedVideos = {
    leadership: videos?.filter((v: any) => v.category === "leadership") || [],
    technical: videos?.filter((v: any) => v.category === "technical") || [],
    popular: videos?.filter((v: any) => v.category === "popular") || [],
  };

  return (
    <section id="general-content" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">เนื้อหาทั่วไป</h2>
        <p className="text-muted-foreground">เนื้อหาการเรียนรู้ที่สามารถเข้าถึงได้ทันที สำหรับการพัฒนาทักษะเพิ่มเติม</p>
      </div>

      {/* Search and Filter */}
      <SearchFilters 
        filters={filters} 
        onFiltersChange={setFilters}
        className="mb-8"
      />

      {/* Content Categories */}

      {/* Leadership Skills */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">ทักษะการเป็นผู้นำ</h3>
          <Link href="/category/leadership">
            <a className="text-primary hover:text-primary/80 text-sm font-medium" data-testid="link-leadership-all">
              ดูทั้งหมด
            </a>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex space-x-4 overflow-x-auto scroll-container pb-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex-none w-80">
                <Card className="bg-card border-border">
                  <div className="aspect-video bg-muted animate-pulse rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-2/3 mb-2"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted rounded animate-pulse w-16"></div>
                      <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex space-x-4 overflow-x-auto scroll-container pb-4">
            {categorizedVideos.leadership.slice(0, 6).map((video: any) => (
              <div key={video.id} className="flex-none w-80">
                <VideoCard
                  id={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnailUrl={video.thumbnailUrl || `https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360`}
                  duration={`${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}`}
                  extraInfo={`${video.viewCount?.toLocaleString()} ครั้ง`}
                  href={`/video/general/${video.id}`}
                  testId={`leadership-video-${video.id}`}
                />
              </div>
            ))}
            {categorizedVideos.leadership.length === 0 && !isLoading && (
              <div className="flex-none w-80">
                <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center">
                    <i className="fas fa-video text-2xl text-muted-foreground mb-4"></i>
                    <p className="text-muted-foreground">ไม่มีวิดีโอในหมวดนี้</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Technical Skills */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">ทักษะเทคนิค</h3>
          <Link href="/category/technical">
            <a className="text-primary hover:text-primary/80 text-sm font-medium" data-testid="link-technical-all">
              ดูทั้งหมด
            </a>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex space-x-4 overflow-x-auto scroll-container pb-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex-none w-80">
                <Card className="bg-card border-border">
                  <div className="aspect-video bg-muted animate-pulse rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-2/3 mb-2"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted rounded animate-pulse w-16"></div>
                      <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex space-x-4 overflow-x-auto scroll-container pb-4">
            {categorizedVideos.technical.slice(0, 6).map((video: any) => (
              <div key={video.id} className="flex-none w-80">
                <VideoCard
                  id={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnailUrl={video.thumbnailUrl || `https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360`}
                  duration={`${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}`}
                  extraInfo={`${video.viewCount?.toLocaleString()} ครั้ง`}
                  href={`/video/general/${video.id}`}
                  testId={`technical-video-${video.id}`}
                />
              </div>
            ))}
            {categorizedVideos.technical.length === 0 && !isLoading && (
              <div className="flex-none w-80">
                <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center">
                    <i className="fas fa-code text-2xl text-muted-foreground mb-4"></i>
                    <p className="text-muted-foreground">ไม่มีวิดีโอในหมวดนี้</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular This Week */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">ยอดนิยมสัปดาห์นี้</h3>
          <Link href="/category/popular">
            <a className="text-primary hover:text-primary/80 text-sm font-medium" data-testid="link-popular-all">
              ดูทั้งหมด
            </a>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <Card key={i} className="bg-card border-border">
                <div className="aspect-video bg-muted animate-pulse rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3 mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted rounded animate-pulse w-16"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categorizedVideos.popular.slice(0, 8).map((video: any, index: number) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                description={video.description}
                thumbnailUrl={video.thumbnailUrl || `https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=360`}
                duration={`${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}`}
                extraInfo={`${video.viewCount?.toLocaleString()} ครั้ง`}
                href={`/video/general/${video.id}`}
                badge={index === 0 ? "#1 ยอดนิยม" : undefined}
                badgeVariant={index === 0 ? "default" : undefined}
                testId={`popular-video-${video.id}`}
              />
            ))}
            {categorizedVideos.popular.length === 0 && !isLoading && (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <i className="fas fa-fire text-2xl text-muted-foreground mb-4"></i>
                  <p className="text-muted-foreground">ไม่มีวิดีโอยอดนิยม</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
