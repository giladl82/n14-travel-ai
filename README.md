# Next 14 AI trip planner
This is a demo project using Nextjs 14 with the app router and ChatGPT.

I only created this project so I will have a chance to play a little with the new app router and with ChatGPT streaming option.

You are free to use this project as a reference on what to do or maybe not to do 😵‍💫

## Running the project
In order to run the project, you need to create a `.env.local` file and add the following keys into it.

```
## OPENAI
OPENAI_API_KEY=

## CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

## SUPABASE
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

If you are working with vscode, then you can just press F5 and run the app.
If not the pnpm run dev, should work just fine.

Good luck, and I hope this project will help you.

### Things I'd like to do
1. Replace the API with a server action (https://sdk.vercel.ai/examples/next-app/chat/stream-chat-completion)
2. Check if I might get a better DX + UX using `tanstack-query`