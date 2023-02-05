require('colors');
module.exports = async (client) => {
  if (client.setting.anticrash){

  process.on('multipleResolves', (type, promise, reason) => {
     client.logger('✯ |=== [AntiCrash] | [multipleResolves] | [start] ===| ✯'.yellow.dim)
    client.logger(type, promise, reason);
    client.logger('✯ |=== [AntiCrash] | [uncaughtException] | [end] ===| ✯'.yellow.dim);
  });
  process.on('unhandledRejection', (reason, promise) => { 
    client.logger(`✯ |=== [AntiCrash] | [unhandledRejection] | [start] ====| ✯`.yellow.dim);
   client.logger(reason);
    client.logger('✯ |=== [AntiCrash] | [unhandledRejection] | [end] ===| ✯'.yellow.dim);
  });
  process.on('rejectionHandled', (promise) => { 
    client.logger('✯ |=== [AntiCrash] | [rejectionHandled] | [start] ===| ✯'.yellow.dim);
    client.logger(promise);
   client.logger('✯ |=== [AntiCrash] | [uncaughtException] | [end] ===| ✯'.yellow.dim);
  })
  process.on("uncaughtException", (err, origin) => { 
    client.logger('✯ |=== [AntiCrash] | [uncaughtException] | [start] ===| ✯'.yellow.dim);
   client.logger(err);
    client.logger('✯ |=== [AntiCrash] | [uncaughtException] | [end] ===| ✯'.yellow.dim);
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => { 
    client.logger('✯ |=== [AntiCrash] | [uncaughtExceptionMonitor] | [start] ===| ✯'.yellow.dim);
    client.logger(err);
    client.logger('✯ |=== [AntiCrash] | [uncaughtExceptionMonitor] | [end] ===| ✯'.yellow.dim);
  });
  }

}
