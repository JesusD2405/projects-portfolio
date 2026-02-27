"use client";
import { FC, useEffect, useState } from "react";
// Components
import { Button, Group, Menu, Portal } from "@chakra-ui/react";
import { EmptyState, VStack } from "@chakra-ui/react";
import { BellOff } from "lucide-react";

const Notification: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const getCurrentDateFormat = () => {
    const date1 = new Date();
    const options1: Intl.DateTimeFormatOptions = {
      weekday: undefined,
      year: undefined,
      month: "short",
      day: undefined,
    };

    return `${date1.getDate()} de ${date1
      .toLocaleDateString("es-VE", options1)
      .replace(".", "")}`;
  };

  const getCurrenTimeFormat = () => {
    const date2 = new Date();
    const options2: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    return date2.toLocaleTimeString("es-VE", options2).replaceAll(".", "");
  };

  useEffect(() => {
    setCurrentDate(getCurrentDateFormat());
    setCurrentTime(getCurrenTimeFormat());
    setMounted(true);

    // Actualizar el reloj cada minuto
    const interval = setInterval(() => {
      setCurrentDate(getCurrentDateFormat());
      setCurrentTime(getCurrenTimeFormat());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" suppressHydrationWarning>
          {mounted && currentDate && currentTime ? (
            <>
              <span className="lowercase">{currentDate}</span>
              <span className="uppercase">{currentTime}</span>
            </>
          ) : (
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          )}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Group grow gap="0">
              {/* Listado de Notificaciones */}
              <Menu.Item value="new-txt">
                <EmptyState.Root>
                  <EmptyState.Content>
                    <EmptyState.Indicator>
                      <BellOff />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                      <EmptyState.Title>No hay notificaciones</EmptyState.Title>
                    </VStack>
                  </EmptyState.Content>
                </EmptyState.Root>
              </Menu.Item>
              {/* Calendario */}
              <Menu.Item value="calendar"></Menu.Item>
            </Group>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default Notification;
