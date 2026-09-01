import { Routes, Route } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, ThemeProvider, createTheme } from "@mui/material";
import ShoppingListScreen from "./components/ShoppingListScreen";
import OrderSummaryScreen from "./components/OrderSummaryScreen";

// Create RTL theme
const theme = createTheme({
  direction: "rtl",
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div dir='rtl'>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
             סופרמרקט אונליין
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path='/' element={<ShoppingListScreen />} />
            <Route path='/order-summary' element={<OrderSummaryScreen />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
