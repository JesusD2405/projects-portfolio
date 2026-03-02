"use client";
import { FC, useEffect, useState } from "react";
// Components
import {
  Button,
  Group,
  Menu,
  Portal,
  Box,
  Image,
  Text,
  HStack,
  VStack,
  EmptyState,
} from "@chakra-ui/react";
import { BellOff, Bell } from "lucide-react";
import profileData from "@/helpers/profile-data";

const Notification: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const notifications = profileData.notifications || [];

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

  useEffect(() => {
    if (mounted && notifications.length > 0) {
      // Show menu after a delay
      const openTimer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      // Automatically close the menu after a few seconds
      const closeTimer = setTimeout(() => {
        setIsOpen(false);
      }, 6000);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [mounted, notifications.length]);

  return (
    <Menu.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" suppressHydrationWarning>
          {mounted && currentDate && currentTime ? (
            <>
              <span className="lowercase">{currentDate}</span>
              <span className="uppercase">{currentTime}</span>
            </>
          ) : (
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          )}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Group grow gap="0">
              {/* Listado de Notificaciones */}
              {notifications.length === 0 ? (
                <Menu.Item value="empty">
                  <EmptyState.Root p={4}>
                    <EmptyState.Content>
                      <EmptyState.Indicator>
                        <BellOff />
                      </EmptyState.Indicator>
                      <VStack textAlign="center">
                        <EmptyState.Title>
                          No hay notificaciones
                        </EmptyState.Title>
                      </VStack>
                    </EmptyState.Content>
                  </EmptyState.Root>
                </Menu.Item>
              ) : (
                <VStack gap={0} p={2} maxW="350px">
                  {notifications.map((notif) => (
                    <Menu.Item
                      key={notif.id}
                      value={notif.id}
                      p={2}
                      borderRadius="md"
                      _hover={{ bg: "bg.muted" }}
                      w="full"
                    >
                      <HStack align="flex-start" gap={3}>
                        {notif.image ? (
                          <Image
                            src={notif.image}
                            alt="icon"
                            boxSize="40px"
                            borderRadius="md"
                            objectFit="cover"
                          />
                        ) : (
                          <Box bg="orange.500" p={2} borderRadius="md">
                            <Bell size={24} color="white" />
                          </Box>
                        )}
                        <VStack align="flex-start" gap={1} flex={1}>
                          <Text
                            fontWeight="bold"
                            fontSize="sm"
                            mt={0}
                            lineHeight={1}
                          >
                            {notif.title}
                          </Text>
                          <Text fontSize="xs" color="fg.muted" lineClamp={3}>
                            {notif.description}
                          </Text>
                          <Text fontSize="2xs" color="fg.subtle">
                            {notif.time}
                          </Text>
                        </VStack>
                      </HStack>
                    </Menu.Item>
                  ))}
                </VStack>
              )}
            </Group>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default Notification;
