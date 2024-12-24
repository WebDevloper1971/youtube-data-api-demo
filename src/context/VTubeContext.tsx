import { createContext, ReactNode, useContext, useState } from "react";

export interface YTVideoData {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    categoryId: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

interface VTubeContext {
  category: number;
  setCategory: (value: number) => void;
}

const VTubeContext = createContext({} as VTubeContext);

export const UseVTubeContext = () => {
  return useContext(VTubeContext);
};

interface VTubeContextProviderProps {
  children: ReactNode;
}

const VTubeContextProvider = ({ children }: VTubeContextProviderProps) => {
  const [category, setCategory] = useState<number>(0);

  function setVideoCategory(value: number) {
    setCategory(value);
  }

  return (
    <VTubeContext.Provider
      value={{
        category,
        setCategory: setVideoCategory,
      }}
    >
      {children}
    </VTubeContext.Provider>
  );
};

export default VTubeContextProvider;
