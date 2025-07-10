export interface Lembrete {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  prioridade: 'baixa' | 'media' | 'alta';
  concluido: boolean;
  usuarioId: string;
}