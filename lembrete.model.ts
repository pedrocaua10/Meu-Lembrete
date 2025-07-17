export interface Lembrete {
  id: string;
  title: string;
  descricao: string;
  data: Date;
  prioridade: 'baixa' | 'media' | 'alta';
  concluido: boolean;
  usuarioId: string; // Adicione se for obrigatório ou usuarioId?: string se for opcional
}