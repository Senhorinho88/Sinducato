angular.module('sindadosApp').controller('PrincipalController', ['$scope', 'ToastService', '$timeout', function ($scope, ToastService, $timeout) {
    $scope.opcoesAtendimento = [
        { rotulo: 'Atendimento sindical', mensagem: 'Consulte os canais oficiais do SINDADOS-BA para confirmar horários de atendimento.', tipo: 'sucesso' },
        { rotulo: 'Documentos de homologação', mensagem: 'Separe identificação, carteira de trabalho e documentos do contrato para solicitar orientação.', tipo: 'sucesso' },
        { rotulo: 'Campanha salarial', mensagem: 'Acompanhe os comunicados oficiais sobre assembleias e negociação coletiva.', tipo: 'urgente' }
    ];
    $scope.selecionarAtendimento = function (item) { ToastService.show(item.mensagem, item.tipo); };
    $scope.abasServicos = [
        { id: 'homologacao', titulo: 'Homologação', conteudo: 'Prepare os documentos antes de solicitar atendimento.', detalhes: ['Separe os documentos do contrato e da rescisão.', 'Confirme o procedimento com o sindicato.'] },
        { id: 'orientacao', titulo: 'Orientação', conteudo: 'Tire dúvidas sobre direitos da categoria de TI na Bahia.', detalhes: ['Consulte a convenção coletiva aplicável.', 'Reúna comprovantes relacionados à sua dúvida.'] },
        { id: 'participacao', titulo: 'Participação', conteudo: 'Acompanhe os debates e decisões coletivas dos trabalhadores.', detalhes: ['Consulte as convocações oficiais de assembleia.', 'Envie propostas pelos canais oficiais.'] }
    ];
    var temporizador;
    $scope.progresso = 0; $scope.enviando = false; $scope.statusEnvio = 'Aguardando início.';
    $scope.cancelarEnvio = function () { $timeout.cancel(temporizador); $scope.enviando = false; $scope.progresso = 0; $scope.statusEnvio = 'Envio cancelado.'; };
    $scope.iniciarEnvio = function () {
        if ($scope.enviando) return;
        $scope.progresso = 0; $scope.enviando = true; $scope.statusEnvio = 'Enviando documentos na simulação...';
        function avancar() {
            $scope.progresso += 20;
            if ($scope.progresso < 100) temporizador = $timeout(avancar, 800);
            else { $scope.enviando = false; $scope.statusEnvio = 'Simulação concluída.'; ToastService.show('Simulação de envio concluída. Nenhum documento foi transmitido.', 'sucesso'); }
        }
        temporizador = $timeout(avancar, 800);
    };
    $scope.$on('$destroy', function () { $timeout.cancel(temporizador); });
    $scope.direitos = [
        { id: 1, titulo: 'Convenção coletiva', conteudo: 'A convenção coletiva reúne condições negociadas para a categoria de TI na Bahia.', detalhes: ['Exemplo: reajuste salarial anual de 5%.', 'Exemplo: jornada de 40 horas semanais.', 'Consulte o documento oficial para verificar vigência e abrangência.'] },
        { id: 2, titulo: 'Pisos salariais por cargo', conteudo: 'Tabela ilustrativa para a atividade. Estes valores não representam pisos oficiais.', detalhes: ['Suporte técnico: R$ 2.200,00.', 'Desenvolvedor júnior: R$ 3.000,00.', 'Analista de sistemas: R$ 4.500,00.'] },
        { id: 3, titulo: 'Auxílios e benefícios', conteudo: 'Exemplos de benefícios discutidos em negociações coletivas.', detalhes: ['Auxílio-alimentação ilustrativo: R$ 30,00 por dia trabalhado.', 'Ajuda de custo para trabalho remoto.', 'Acompanhamento das condições de saúde e segurança.'] },
        { id: 4, titulo: 'Homologação e atendimento', conteudo: 'Antes de solicitar atendimento, reúna os documentos necessários e consulte os canais oficiais do sindicato.', detalhes: ['Documento de identificação.', 'Carteira de trabalho e documentos do contrato.', 'Termo de rescisão, quando aplicável.'] }
    ];
    $scope.noticias = [
        { id: 1, data: '2026-11-10', categoria: 'Assembleia', titulo: 'Debate sobre a campanha salarial', resumo: 'Exemplo de convocação para profissionais de TI discutirem propostas de reajuste e benefícios.' },
        { id: 2, data: '2026-11-09', categoria: 'Negociação', titulo: 'Pautas da convenção coletiva', resumo: 'Jornada, alimentação e condições do trabalho remoto estão entre os temas deste comunicado fictício.' },
        { id: 3, data: '2026-11-08', categoria: 'Atendimento', titulo: 'Documentos para homologação', resumo: 'Confira no acordeão os exemplos de documentos que podem ser solicitados no atendimento.' },
        { id: 4, data: '2026-11-07', categoria: 'Formação', titulo: 'Encontro sobre qualificação em TI', resumo: 'Proposta de encontro para troca de experiências entre estudantes e trabalhadores da Bahia.' },
        { id: 5, data: '2026-11-06', categoria: 'Saúde', titulo: 'Cuidados com ergonomia', resumo: 'Pausas e organização do posto de trabalho são assuntos de interesse da categoria.' },
        { id: 6, data: '2026-11-05', categoria: 'Edital', titulo: 'Participação dos trabalhadores', resumo: 'Edital fictício sobre envio de sugestões para a próxima reunião da categoria.' },
        { id: 7, data: '2026-11-04', categoria: 'Direitos', titulo: 'Como consultar o piso salarial', resumo: 'O enquadramento depende do cargo e das regras do instrumento coletivo aplicável.' },
        { id: 8, data: '2026-11-03', categoria: 'Trabalho remoto', titulo: 'Discussão sobre ajuda de custo', resumo: 'Exemplo de pauta sobre equipamentos e despesas de conexão no trabalho remoto.' }
    ];
    $scope.paginaAtual = 1;
    $scope.itensPorPagina = 3;
    $scope.totalPaginas = Math.ceil($scope.noticias.length / $scope.itensPorPagina);
    $scope.mudarPagina = function (pagina) {
        $scope.paginaAtual = pagina;
        var inicio = (pagina - 1) * $scope.itensPorPagina;
        $scope.noticiasVisiveis = $scope.noticias.slice(inicio, inicio + $scope.itensPorPagina);
    };
    $scope.mostrarAviso = function (tipo) {
        var mensagens = {
            urgente: 'Assembleia da categoria: acompanhe os canais oficiais para confirmar data e local. Aviso demonstrativo.',
            sucesso: 'Interesse registrado nesta demonstração. Nenhum dado foi enviado.',
            erro: 'Não foi possível concluir a inscrição. Esta é uma simulação de erro.'
        };
        ToastService.show(mensagens[tipo], tipo);
    };
    $scope.mudarPagina(1);
}]);
