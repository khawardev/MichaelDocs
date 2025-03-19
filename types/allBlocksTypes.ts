interface BlockInterface {
  name: string;
  category: string;
  href: string;
  container: {
    height: string;
    className: string;
  };
  new?: boolean;
  code: string;
  image: {
    url: string;
    className?: string;
  };
}

export interface AllBlocksDataProps {
  comp?: string;
  more?: string;
  className?: string;
  AllBlocksData?: BlockInterface[];
}
