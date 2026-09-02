import { Routes, Route } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, ThemeProvider, createTheme } from "@mui/material";
import ShoppingListScreen from "./Components/ShoppingListScreen";
import OrderSummaryScreen from "./Components/OrderSummaryScreen";

// Create RTL theme
const theme = createTheme({
  direction: "rtl",
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div dir='rtl'>
        <AppBar
          position='static'
          sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
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
