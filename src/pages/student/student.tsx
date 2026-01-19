import { useParams, Link } from "react-router-dom";
import "./student.scss";

export default function StudentPage() {
    const { sessionId } = useParams<{ sessionId: string }>();

    return (
        <div className="student-page">
            <header className="student-header">
                <h1>Área do Aluno</h1>
                <p>
                    Sessão: <strong>{sessionId}</strong>
                </p>
            </header>

            <main className="student-content">
                <h2>Aguardando a pergunta do professor…</h2>
                <p>Quando o professor iniciar um slide interativo, ele vai aparecer aqui.</p>

                <p>
                    Você entrou na sessão <strong>{sessionId}</strong>.
                </p>

                <Link to="/" className="student-back">
                    Voltar para a Home
                </Link>
            </main>
        </div>
    );
}
