#!/usr/bin/env bash
# Usage: wait-for-it.sh host:port -- command
hostport=$1
shift
cmd="$@"

host=$(echo "$hostport" | cut -d: -f1)
port=$(echo "$hostport" | cut -d: -f2)

while ! nc -z "$host" "$port"; do
  echo "⏳ En attente de $host:$port..."
  sleep 1
done

echo "✅ $host:$port est disponible !"
exec $cmd
