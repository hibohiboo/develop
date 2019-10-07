<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Mail\Mailer;
use App\User;

class RegisteredListener
{
    /**
     * @var \Illuminate\Mail\Mailer
     */
    private $mailer;
    /**
     * @var \App\User
     */
    private $eloquent;
    /**
     * Create the event listener.
     *
     * @param  \Illuminate\Mail\Mailer $mailer
     * @param  \App\User $eloquent
     *
     * @return void
     */
    public function __construct(Mailer $mailer, User $eloquent)
    {
        $this->mailer = $mailer;
        $this->eloquent = $eloquent;
    }
    /**
     * Handle the event.
     *
     * @param  Registered  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $user = $this->eloquent->findOrFail($event->user->getAuthIdentifier());
        $this->mailer->raw('会員登録完了しました', function ($message) use ($user) {
            $message->subject('会員登録メール')->to($user->email);
        });
    }
}
