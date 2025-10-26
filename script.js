const vkConnect = new VKConnect();

// Инициализация приложения
vkConnect.send('VKWebAppInit', {});

document.getElementById('buyButton').addEventListener('click', function() {
    // Запрос данных пользователя
    vkConnect.send('VKWebAppGetUserInfo', {})
        .then(user => {
            // Открытие VK Pay
            vkConnect.send('VKWebAppOpenPayForm', {
                app_id: YOUR_APP_ID, // ID вашего приложения
                action: 'pay-to-service',
                params: {
                    amount: '29900', // 299 руб в копейках
                    description: 'Модератор бота на 30 дней',
                    user_id: user.id
                }
            })
            .then(data => {
                if (data.status === 'success') {
                    // Успешная оплата
                    processPayment(user.id, data.order_id);
                }
            })
            .catch(error => {
                console.error('Payment error:', error);
            });
        })
        .catch(error => {
            console.error('User info error:', error);
        });
});

function processPayment(userId, orderId) {
    // Отправляем данные на сервер
    fetch('payment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            order_id: orderId,
            timestamp: Math.floor(Date.now() / 1000)
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccess();
        } else {
            showError();
        }
    })
    .catch(error => {
        console.error('Server error:', error);
        showError();
    });
}

function showSuccess() {
    vkConnect.send('VKWebAppShowMessage', {
        message: '🎉 Поздравляем! Теперь вы модератор бота!'
    });
}

function showError() {
    vkConnect.send('VKWebAppShowMessage', {
        message: '❌ Ошибка оплаты. Попробуйте позже.'
    });
}
