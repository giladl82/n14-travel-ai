import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function FormHeader() {
  return (
    <CardHeader>
      <CardTitle>Hi!</CardTitle>
      <CardDescription>
        I&apos;m your personal AI trip advisor.
        <br />
        If you will answer some questions,
        <br />I might be able to plan you dream vacation!
      </CardDescription>
    </CardHeader>
  );
}
