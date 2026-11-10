angular.module('sindados.toast', [])
.factory('ToastService', ['$timeout', function ($timeout) {
    var estado = { mensagem: '', tipo: 'sucesso', visivel: false }, temporizador;
    function fechar() { $timeout.cancel(temporizador); temporizador = null; estado.visivel = false; }
    function show(mensagem, tipo) {
        fechar();
        estado.mensagem = mensagem;
        estado.tipo = ['sucesso', 'erro', 'urgente'].indexOf(tipo) !== -1 ? tipo : 'sucesso';
        estado.visivel = true;
        temporizador = $timeout(fechar, 4000);
    }
    return { estado: estado, show: show, fechar: fechar };
}])
.directive('sindToast', ['ToastService', function (ToastService) {
    return { restrict: 'E', scope: {}, templateUrl: 'js/components/toast/toast.html',
        link: function (scope) { scope.toast = ToastService.estado; scope.fechar = ToastService.fechar; }
    };
}]);
