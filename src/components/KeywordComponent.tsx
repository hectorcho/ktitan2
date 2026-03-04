import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { useKeywordList } from "../hooks/useKeywordList";
import KeywordBox from "./KeywordBox";
import { tokens } from "../theme";

const KeywordComponent: React.FC = () => {
    const {data, isLoading, error} = useKeywordList();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    if (isLoading) {
        return <CircularProgress />
    }

    if (error) {
        return <Typography color="error">Error: {error instanceof Error ? error.message : String(error)}</Typography>
    }

    // Filter data by type
    const nationalKeywords = data?.filter(keyword => keyword.type === "national") || [];
    const militaryKeywords = data?.filter(keyword => keyword.type === "military") || [];

    const renderEmptySpaces = (itemCount: number) => {
        const emptySlots = 4 - itemCount;
        if (emptySlots <= 0) return null;
        return Array.from({length: emptySlots}).map((_, index) => (
            <Box key={`spacer-${index}`} sx={{gridColumn: "span 3"}} />
        ));
    }

    return (
        <Box
          sx={{
            width: "70%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(16, 1fr)",
            gridAutoRows: "50px",
            gridAutoColumns: "auto",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              gridColumn: "span 4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">국내 관심 키워드</Typography>
          </Box>
          {nationalKeywords.slice(0, 4).map((item, index) => (
            <Box
              key={`national-${index}`}
              sx={{
                gridColumn: "span 3",
                backgroundColor: `${colors.primary[400]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <KeywordBox title={item.keyword} subtitle="" quantity={item.quantity} />
            </Box>
          ))}
          {renderEmptySpaces(nationalKeywords.length)}

          <Box
            sx={{
              gridColumn: "span 4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">군 관심 키워드</Typography>
          </Box>
          {militaryKeywords.slice(0, 4).map((item, index) => (
            <Box
              key={`military-${index}`}
              sx={{
                gridColumn: "span 3",
                backgroundColor: `${colors.primary[400]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <KeywordBox title={item.keyword} subtitle="" quantity={item.quantity} />
            </Box>
          ))}
          {renderEmptySpaces(militaryKeywords.length)}
        </Box>
    )
}

export default KeywordComponent;