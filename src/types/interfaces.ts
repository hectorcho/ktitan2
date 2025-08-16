export interface Country {
  id: number;
  name: string;
  capital: string;
  code: string;
  position: [number, number];
  positionDashboard?: [number, number];
  info: string;
  riskScore: number;
};

export interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | string | null;
};

export interface CalendarEvent {
  title: string;
  start: string | Date;
  end: string | Date;
  location: string;
  description: string;
  id: string;
  summaryUrl: string;
  eventUrl: string;
};

export interface CalendarDialogProps extends FetchResult<string> {
  open: boolean;
  onClose: () => void;
  title: string;
};

export interface CommunityComponentProps {
  onCardClick: (url: string | null) => void;
  isDashboard: boolean;
};

export interface CommunityCardProps {
  data: CommunityData;
  isSelected: boolean;
  isDashboard: boolean;
};

export interface CommunityData {
  title: string;
  url: string;
  summary: string;
  categories: string;
  source: string;
  date: string | Date;
  fakeProbability: number;
  resolved: boolean;
  resolutionUrl: string;
  views: number;
  likes: number;
  comments: number;
};

export interface Conflict {
  id: string;
  title: string;
  path: string;
};

export type ConflictConditionStatus = "improved" | "deteriorated" | "unchanged" | "critical";
export interface ConflictEvent {
  id: string;
  condition: ConflictConditionStatus;
  title: string;
  summary: string;
  date: string;
  url: string;
  reportUrl: string;
};

export interface ConflictCardProps {
  data: ConflictEvent;
  selected: boolean;
  dashboard: boolean;
};

export interface ConflictComponentProps {
  onCardClick: (url: string | null) => void;
  dashboard: boolean;
  conflictId: string;
}

export interface ResolutionComponentProps {
  resolutionUrl: string | null;
};

export interface NewsData {
  title: string;
  summary: string;
  source: string;
  date: string | Date;
  url: string;
  reportUrl: string;
};

export interface NewsCardProps {
  data: NewsData;
  isSelected: boolean;
  isDashboard: boolean;
};

export interface NewsComponentProps {
  onCardClick: (url: string | null) => void;
  isDashboard: boolean;
};