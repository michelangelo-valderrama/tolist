import { Link } from 'react-router-dom'
import { useSidebarStore } from '@/stores/sidebar.store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, type ButtonProps } from '@/components/ui/button'

interface Props extends ButtonProps {
  pictureUrl: string
  username: string
}

export function Profile({ pictureUrl, username, ...props }: Props) {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])
  const ariaLabel = `Profile for ${username}`

  const UserAvatar = (
    <Avatar className="rounded-md size-8">
      <AvatarImage alt={`${username}'s profile picture`} src={pictureUrl} />
      <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )

  if ($sidebarOpen) {
    return (
      <Link to="/app/profile">
        <Button
          className="gap-x-3 flex-1 justify-start px-2 h-12 w-full text-foreground overflow-hidden"
          aria-label={ariaLabel}
          variant="ghosty"
          size="lg"
          {...props}
        >
          {UserAvatar}
          <p className="font-bold text-lg">{username}</p>
        </Button>
      </Link>
    )
  }

  return (
    <Link to="/app/profile">
      <Button
        aria-label={ariaLabel}
        className="size-12"
        variant="ghosty"
        size="icon"
        {...props}
      >
        {UserAvatar}
      </Button>
    </Link>
  )
}
