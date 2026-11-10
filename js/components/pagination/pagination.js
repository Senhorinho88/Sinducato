(function () {
    'use strict';

    angular.module('sindados.pagination', [])
        .directive('sindPagination', function () {
            return {
                restrict: 'E',
                scope: {
                    totalPaginas: '@',
                    paginaAtual: '=',
                    onPageChange: '&'
                },
                templateUrl: 'js/components/pagination/pagination.html',
                link: function (scope) {
                    scope.paginas = [];

                    scope.$watchGroup(['totalPaginas', 'paginaAtual'], function () {
                        var total = Number(scope.totalPaginas);
                        scope.total = isFinite(total) ? Math.max(0, Math.floor(total)) : 0;
                        scope.paginas = [];

                        for (var numero = 1; numero <= scope.total; numero++) {
                            scope.paginas.push(numero);
                        }

                        // Mantém a página válida se a quantidade de dados mudar.
                        var atual = Number(scope.paginaAtual);
                        var pagina = isFinite(atual) ? Math.floor(atual) : 1;
                        pagina = Math.max(1, Math.min(pagina, scope.total || 1));

                        if (scope.paginaAtual !== pagina) {
                            scope.paginaAtual = pagina;
                            scope.onPageChange({ pagina: pagina });
                        }
                    });

                    scope.irPara = function (pagina) {
                        if (pagina < 1 || pagina > scope.total || pagina === scope.paginaAtual) {
                            return;
                        }

                        scope.paginaAtual = pagina;
                        scope.onPageChange({ pagina: pagina });
                    };
                }
            };
        });
})();
