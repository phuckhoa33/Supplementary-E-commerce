import { Module, forwardRef } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment]),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
              transport: {
                host: config.get('MAIL_HOST'),
                secure: false,
                auth: {
                  user: config.get('MAIL_USER'),
                  pass: config.get('MAIL_PASSWORD')
                }
      
              },
              defaults: {
                from: `"No Reply" <${config.get('MAIL_FROM')}`
              },
              template: {
                dir: join(__dirname, './templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true
                }
              }
            }),
            inject: [ConfigService]
        }),
        forwardRef(() => UserModule)
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService]
})

export class PaymentModule{}