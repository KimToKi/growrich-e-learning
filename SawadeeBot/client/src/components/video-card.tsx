import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  extraInfo?: string;
  href: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
  progress?: number;
  lockMessage?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  testId?: string;
}

export default function VideoCard({
  id,
  title,
  description,
  thumbnailUrl,
  duration,
  extraInfo,
  href,
  isLocked = false,
  isCompleted = false,
  isCurrent = false,
  progress = 0,
  lockMessage,
  badge,
  badgeVariant = "default",
  className,
  testId,
}: VideoCardProps) {
  if (isLocked) {
    return (
      <div>
        <Card 
          className={cn(
            "video-card bg-card border-border group cursor-not-allowed transition-all duration-300",
            "opacity-60",
            className
          )}
          data-testid={testId ? `card-${testId}` : `card-video-${id}`}
        >
          <div className="relative aspect-video">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover rounded-t-lg"
              data-testid={testId ? `img-${testId}` : `img-video-${id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Lock Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-lock text-primary text-3xl lock-icon" data-testid={testId ? `icon-lock-${testId}` : `icon-lock-${id}`}></i>
            </div>
            {lockMessage && (
              <div className="absolute bottom-3 left-3 right-3 bg-black/80 rounded p-2">
                <p className="text-xs text-white text-center" data-testid={testId ? `text-lock-message-${testId}` : `text-lock-message-${id}`}>
                  {lockMessage}
                </p>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2" data-testid={testId ? `text-title-${testId}` : `text-title-${id}`}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={testId ? `text-description-${testId}` : `text-description-${id}`}>
              {description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span data-testid={testId ? `text-extra-info-${testId}` : `text-extra-info-${id}`}>
                {extraInfo}
              </span>
              <span data-testid={testId ? `text-duration-info-${testId}` : `text-duration-info-${id}`}>
                {duration}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Link href={href}>
      <Card 
        className={cn(
          "video-card bg-card border-border group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10",
          isLocked && "opacity-60 cursor-not-allowed hover:scale-100",
          isCurrent && "border-primary",
          className
        )}
        data-testid={testId ? `card-${testId}` : `card-video-${id}`}
      >
        <div className="relative aspect-video">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
            data-testid={testId ? `img-${testId}` : `img-video-${id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Status Badges */}
          {isCompleted && (
            <Badge 
              className="absolute top-3 right-3 bg-accent text-accent-foreground"
              data-testid={testId ? `badge-completed-${testId}` : `badge-completed-${id}`}
            >
              <i className="fas fa-check mr-1"></i>
              เรียนจบแล้ว
            </Badge>
          )}
          
          {isCurrent && !isCompleted && (
            <Badge 
              className="absolute top-3 right-3 bg-primary text-primary-foreground animate-pulse"
              data-testid={testId ? `badge-current-${testId}` : `badge-current-${id}`}
            >
              <i className="fas fa-play mr-1"></i>
              กำลังเรียน
            </Badge>
          )}

          {badge && !isCompleted && !isCurrent && (
            <Badge 
              variant={badgeVariant}
              className="absolute top-3 left-3"
              data-testid={testId ? `badge-custom-${testId}` : `badge-custom-${id}`}
            >
              {badge}
            </Badge>
          )}

          {/* Progress Ring for Packs */}
          {(progress > 0 || isCompleted) && !isLocked && (
            <div className="absolute bottom-3 right-3">
              <svg className="w-8 h-8 progress-ring">
                <circle 
                  cx="16" 
                  cy="16" 
                  r="14" 
                  stroke="hsl(0 0% 30%)" 
                  strokeWidth="2" 
                  fill="none"
                />
                <circle 
                  cx="16" 
                  cy="16" 
                  r="14" 
                  stroke={isCompleted ? "hsl(45 93% 50%)" : "hsl(348 83% 47%)"} 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="87.96"
                  strokeDashoffset={87.96 - (87.96 * (isCompleted ? 100 : progress) / 100)}
                  className="transition-all duration-300"
                />
              </svg>
            </div>
          )}

          {/* Lock Icon */}
          {isLocked && (
            <>
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-lock text-primary text-3xl lock-icon" data-testid={testId ? `icon-lock-${testId}` : `icon-lock-${id}`}></i>
              </div>
              {lockMessage && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 rounded p-2">
                  <p className="text-xs text-white text-center" data-testid={testId ? `text-lock-message-${testId}` : `text-lock-message-${id}`}>
                    {lockMessage}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Duration */}
          {!isLocked && (
            <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs" data-testid={testId ? `text-duration-${testId}` : `text-duration-${id}`}>
              {duration}
            </div>
          )}

          {/* Play Overlay */}
          {!isLocked && (
            <div className="card-overlay absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-play text-white text-2xl"></i>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2" data-testid={testId ? `text-title-${testId}` : `text-title-${id}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={testId ? `text-description-${testId}` : `text-description-${id}`}>
            {description}
          </p>
          
          {/* Progress Bar for Current Pack */}
          {isCurrent && progress > 0 && (
            <div className="mb-2">
              <Progress value={progress} className="h-1 mb-1" data-testid={testId ? `progress-${testId}` : `progress-${id}`} />
              <div className="text-xs text-muted-foreground" data-testid={testId ? `text-progress-${testId}` : `text-progress-${id}`}>
                {Math.round(progress)}% เรียนแล้ว
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span data-testid={testId ? `text-extra-info-${testId}` : `text-extra-info-${id}`}>
              {extraInfo}
            </span>
            <span data-testid={testId ? `text-duration-info-${testId}` : `text-duration-info-${id}`}>
              {duration}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
