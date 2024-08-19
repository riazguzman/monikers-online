import { View, Text, Button, StyleSheet } from "react-native";

import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useState, memo } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/card";
import CountdownTimer from "@/components/timer";
import useCountDownTimer from "@/components/timer";

const client = createClient(
  "https://feuscrwaaovwfdodnplm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldXNjcndhYW92d2Zkb2RucGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMzQ1NzEsImV4cCI6MjAzODYxMDU3MX0.NObClanW3qgYC8OKzjhXDcZaYX2sV19mRuLjsL9DSaI"
);

const channelConfig = {
  config: { broadcast: { self: true } },
};

const randomUser = `user-${Math.floor(Math.random() * 1000)}`;

type Card = {
  title: string;
  description: string;
  correct: boolean;
};

const cardsDB: Card[] = [
  { title: "cat", description: "meow", correct: false },
  { title: "dog", description: "woof", correct: false },
  { title: "horse", description: "neigh", correct: false },
  { title: "cow", description: "moo", correct: false },
  { title: "sheep", description: "baa", correct: false },
  { title: "duck", description: "quack", correct: false },
  { title: "pig", description: "oink", correct: false },
  { title: "lion", description: "roar", correct: false },
  { title: "frog", description: "ribbit", correct: false },
  { title: "chicken", description: "cluck", correct: false },
  { title: "elephant", description: "trumpet", correct: false },
  { title: "snake", description: "hiss", correct: false },
  { title: "wolf", description: "howl", correct: false },
];

const Join = () => {
  // get channel ID from params
  const { channel } = useLocalSearchParams();

  // playres
  const [players, setPlayers] = useState([]);

  // card
  const [cards, setCards] = useState<Card[]>(cardsDB);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // game
  const [isConnected, setIsConnected] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // channel
  const [broadcastChannel, setBroadcastChannel] =
    useState<RealtimeChannel | null>(null);

  const areAnyCardsLeft = () => {
    let flag = false;

    cards.forEach((card) => {
      if (!card.correct) {
        flag = true;
      }
    });

    return flag;
  };

  useEffect(() => {
    // no cards left to guess
    if (!areAnyCardsLeft()) {
      setIsGameFinished(true);
    }
  }, [cards]);

  const onImcrementCardIndex = (): number | null => {
    let index = activeCardIndex + 1;

    // wrap around to first card
    if (!cards[index]) {
      index = 0;
    }

    // loop through cards until we find a card that hasn't been guessed
    while (cards[index].correct && cards[index + 1]) {
      index++;
    }

    // set card index
    return index;
  };

  useEffect(() => {
    if (!channel || isConnected) {
      return;
    }

    const newChannel = client.channel(`game-${channel}`, channelConfig);
    setBroadcastChannel(newChannel);

    const subscription = newChannel
      .on("broadcast", { event: "update" }, ({ payload }) => {
        onUpdate(payload);
      })
      .on("broadcast", { event: "join" }, ({ payload }) => {
        setPlayers(payload);
      })
      .on("broadcast", { event: "turn" }, ({ paylaod }) => {
        console.log(paylaod);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    return () => {
      subscription.unsubscribe();
      newChannel.unsubscribe();
    };
  }, [channel]);

  useEffect(() => {
    if (isConnected) {
      if (!broadcastChannel) return;

      const uniquePlayers = [...new Set([...players, randomUser])];

      broadcastChannel.send({
        type: "broadcast",
        event: "join",
        payload: uniquePlayers,
      });
    }
  }, [isConnected]);

  type OnUpdateProps = {
    cards: Card[];
    activeCardIndex: number;
  };

  const onUpdate = async ({ cards, activeCardIndex }: OnUpdateProps) => {
    if (!cards || activeCardIndex === null) return;
    setCards(cards);
    setActiveCardIndex(activeCardIndex);
  };

  const onClick = (correctStatus: boolean) => {
    if (!broadcastChannel || finished) return;

    const cardsCopy = [...cards];
    cardsCopy[activeCardIndex].correct = correctStatus;

    const incrementedCardIndex = onImcrementCardIndex();

    broadcastChannel.send({
      type: "broadcast",
      event: "update",
      payload: { cards: cardsCopy, activeCardIndex: incrementedCardIndex },
    });
  };

  const cardsCorrect = cards.filter((card) => card.correct).length;
  const cardsRemaining = cards.length - cardsCorrect;

  const turnEnd = new Date(new Date().getTime() + 60000).getTime();

  const { CountdownTimer, finished } = useCountDownTimer(turnEnd);

  return (
    <View>
      <CountdownTimer />

      <Text>Correct: {cardsCorrect} </Text>
      <Text>Remaining: {cardsRemaining} </Text>

      {isGameFinished && <Text>All Cards Are Correct</Text>}

      {finished && <Text>Time Has Ran Out!</Text>}

      {!isGameFinished && !finished && (
        <View style={style.cardContainer}>
          <Card
            title={cards[activeCardIndex].title}
            description={cards[activeCardIndex].description}
          />
        </View>
      )}

      {!isGameFinished && (
        <View>
          <Button
            title="Correct"
            onPress={() => {
              onClick(true);
            }}
          />
          <Button
            title="Pass"
            onPress={() => {
              onClick(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    padding: 10,
    height: 350,
  },
});

export default Join;
