'use client'

import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Button from "./ui/Button";
import Link from "next/link";

const plans = [
  {
    title: "BASIC",
    price: "9.99€/mes",
    features: ["Acceso a todos los cursos", "Soporte básico"],
  },
  {
    title: "PRO",
    price: "19.99€/mes",
    features: ["Publicar cursos", "Estadísticas avanzadas", "Certificados", "Soporte"],
    popular: true,
  },
  {
    title: "PREMIUM",
    price: "29.99€/mes",
    features: ["Acceso a todos los cursos", "Soporte avanzado", "Certificados", "Soporte"],
  },
];

export default function PricingCards() {
  return (
    <section
      className="py-20 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="container mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: "var(--color-text)" }}
        >
          Planes y Precios
        </h2>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
            width: "100%",
          }}
        >
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              size="sm"
              variant={plan.popular ? "soft" : "outlined"}
              color={plan.popular ? "warning" : "neutral"}
              invertedColors={plan.popular ? true : false}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 4,
                minHeight: 420,
                maxWidth: 350,
                mx: "auto",
                borderRadius: "1.5rem",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px) scale(1.03)" },
              }}
            >
              {plan.popular && <Chip size="sm" color="warning">POPULAR</Chip>}
              <Typography level="h4" sx={{ mt: 2, mb: 2 }}>
                {plan.title}
              </Typography>
              <Divider sx={{ width: "100%", my: 1 }} />
              <List size="sm" sx={{ width: "100%", flex: 1 }}>
                {plan.features.map((f, i) => (
                  <ListItem key={i}>
                    <ListItemDecorator>
                      <Check fontSize="small" />
                    </ListItemDecorator>
                    {f}
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ width: "100%", my: 1 }} />
              <CardActions sx={{ width: "100%", justifyContent: "space-between" }}>
                <Typography level="h6">
                  {plan.price}{" "}
                  <Typography textColor="text.tertiary" sx={{ fontSize: "sm" }}>
                    / mes
                  </Typography>
                </Typography>
                <Link href="/payments">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                  >
                    Suscribirme
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>
    </section>
  );
}