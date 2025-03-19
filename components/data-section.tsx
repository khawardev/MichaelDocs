import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataSectionProps {
    title: string
    data: Record<string, string>
}

export function DataSection({ title, data }: DataSectionProps) {
    return (
        <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-muted/50 rounded-t-lg">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="space-y-4">
                    {Object.entries(data).map(([key, value], index) => (
                        <div key={index} className="group">
                            <div className="font-medium text-primary mb-1">{key}</div>
                            <div className="pl-3 border-l-2 border-muted-foreground/20 group-hover:border-primary/50 transition-colors">
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

