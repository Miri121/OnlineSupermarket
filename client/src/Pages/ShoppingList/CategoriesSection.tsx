import { Box, Paper, Typography, CircularProgress, Chip } from "@mui/material";
import { ICategory } from "../../Interfaces";
import { CATEGORIES } from "../../Common/CommonConstants";

interface CategoriesSectionProps {
  categories: ICategory[];
  loading: boolean;
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number) => void;
  styles: any;
}

export function CategoriesSection({
  categories,
  loading,
  selectedCategory,
  onCategorySelect,
  styles,
}: CategoriesSectionProps) {
  return (
    <Paper elevation={2} sx={styles.categoriesPaper}>
      <Typography variant='h5' gutterBottom sx={styles.sectionTitle}>
        {CATEGORIES}
      </Typography>
      {loading && !categories.length ? (
        <CircularProgress />
      ) : (
        <Box sx={styles.categoriesBox}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => onCategorySelect(category.id)}
              variant={selectedCategory === category.id ? "filled" : "outlined"}
              sx={{
                ...styles.categoryChip,
                ...(selectedCategory === category.id && {
                  backgroundColor: "#667eea",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#5568d3",
                  },
                }),
                ...(selectedCategory !== category.id && {
                  borderColor: "#667eea",
                  color: "#667eea",
                  "&:hover": {
                    borderColor: "#764ba2",
                    backgroundColor: "rgba(102, 126, 234, 0.08)",
                  },
                }),
              }}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
}
