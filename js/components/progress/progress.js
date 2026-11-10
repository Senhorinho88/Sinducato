angular.module('sindados.progress', []).directive('sindProgress', function () {
    return { restrict: 'E', scope: { valor: '=', titulo: '@' }, templateUrl: 'js/components/progress/progress.html',
        link: function (scope) {
            scope.$watch('valor', function (valor) { scope.porcentagem = Math.max(0, Math.min(100, Number(valor) || 0)); });
        }
    };
});
