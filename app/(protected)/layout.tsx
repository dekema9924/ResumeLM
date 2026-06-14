import ProtectedWrapper from "@/components/ui/ProtectedWrapper";


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedWrapper>{children}</ProtectedWrapper>
}